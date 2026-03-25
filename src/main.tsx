import { createRoot } from "react-dom/client";
import App from "@/components/ui/App";
import "./index.css";
import { detectConnectionQuality, getAdaptiveConfig } from "@/lib/network-quality";

// Detect connection quality early
const connectionQuality = detectConnectionQuality();
const adaptiveConfig = getAdaptiveConfig(connectionQuality);

// Store in window for global access
(window as any).__ADAPTIVE_CONFIG__ = adaptiveConfig;
(window as any).__CONNECTION_QUALITY__ = connectionQuality;

// Add document class for CSS-level adaptations
document.documentElement.setAttribute('data-connection', connectionQuality);
if (adaptiveConfig.disableAnimations) {
  document.documentElement.style.setProperty('--disable-animations', '1');
}

// Reduce animations if on slow network
if (adaptiveConfig.disableAnimations) {
  const style = document.createElement('style');
  style.textContent = `
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}

// Enhanced fetch with keepalive, connection pooling, and retry logic
const originalFetch = window.fetch;
const MAX_RETRIES = connectionQuality === 'slow' ? 5 : 3;
const BASE_TIMEOUT = adaptiveConfig.fetchTimeout;
const requestCache = new Map<string, Promise<Response>>();

async function fetchWithRetry(
  resource: RequestInfo | URL,
  options: RequestInit & { retryCount?: number } = {}
): Promise<Response> {
  const url = typeof resource === 'string' ? resource : resource instanceof URL ? resource.toString() : (resource as Request).url;
  const retryCount = options.retryCount || 0;
  
  // Avoid duplicate simultaneous requests
  const cacheKey = `${url}-${JSON.stringify(options)}`;
  if (options.method === 'GET' && requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)!;
  }

  const fetchPromise = (async () => {
    try {
      const timeout = Math.min(BASE_TIMEOUT + (retryCount * 5000), 60000); // Cap at 60s
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.warn(`[erdh] Fetch timeout for ${url} (${timeout}ms, retry ${retryCount})`);
        controller.abort();
      }, timeout);

      const response = await originalFetch(resource, {
        ...options,
        signal: controller.signal,
        keepalive: true, // Keep connection alive for reuse
      });

      clearTimeout(timeoutId);
      
      // Clear cache on success
      requestCache.delete(cacheKey);
      
      return response;
    } catch (error) {
      const isAbort = error instanceof DOMException && error.name === 'AbortError';
      const isNetworkError = error instanceof TypeError;
      
      console.error(`[erdh] Fetch failed for ${url}:`, {
        retry: retryCount,
        error: isAbort ? 'timeout' : isNetworkError ? 'network' : 'unknown',
        message: error instanceof Error ? error.message : String(error),
      });

      if (retryCount < MAX_RETRIES) {
        // Exponential backoff with jitter
        const baseDelay = Math.min(1000 * Math.pow(2, retryCount), 10000);
        const jitter = Math.random() * 1000;
        const delay = baseDelay + jitter;
        
        console.log(`[erdh] Retrying ${url} in ${Math.round(delay)}ms (attempt ${retryCount + 1}/${MAX_RETRIES})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(resource, { ...options, retryCount: retryCount + 1 });
      }
      
      throw error;
    }
  })();

  // Cache GET requests to avoid duplicates
  if (options.method === 'GET' || !options.method) {
    requestCache.set(cacheKey, fetchPromise);
    fetchPromise.catch(() => requestCache.delete(cacheKey));
  }

  return fetchPromise;
}

// Override window.fetch with retry logic
window.fetch = fetchWithRetry as any;

// Add global error handler
let hasErrored = false;
window.addEventListener('error', (event) => {
  if (!hasErrored && event.error) {
    hasErrored = true;
    console.error('[erdh] Global error:', event.error);
    // Don't prevent default - let React error boundary handle it
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('[erdh] Unhandled promise rejection:', event.reason);
});

// Register service worker with error handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then(reg => {
        console.log('[erdh] Service Worker registered');
        // Check for updates periodically
        setInterval(() => reg.update(), 60000);
      })
      .catch((err) => {
        console.debug('[erdh] SW registration failed:', err.message);
      });
  });
}

// Log when app is mounted
const originalCreateRoot = createRoot;
const root = document.getElementById('root');
if (root) {
  console.log('[erdh] Mounting React app...');
  
  originalCreateRoot(root).render(<App />);
  
  // Mark as loaded
  document.documentElement.removeAttribute('data-loading');
  document.documentElement.setAttribute('data-app-loaded', 'true');
  
  console.log('[erdh] App mounted successfully');
} else {
  console.error('[erdh] Root element not found!');
}
