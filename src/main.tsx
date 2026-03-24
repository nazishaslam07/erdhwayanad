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

// Enhanced fetch with retry logic and improved timeout handling
const originalFetch = window.fetch;
const MAX_RETRIES = 3;
const BASE_TIMEOUT = adaptiveConfig.fetchTimeout;

async function fetchWithRetry(
  resource: RequestInfo | URL,
  options: RequestInit & { retryCount?: number } = {}
): Promise<Response> {
  const retryCount = options.retryCount || 0;
  const timeout = BASE_TIMEOUT + (retryCount * 5000); // Add 5s per retry

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await originalFetch(resource, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(resource, { ...options, retryCount: retryCount + 1 });
    }
    throw error;
  }
}

// Override window.fetch with retry logic
window.fetch = fetchWithRetry as any;

// Register service worker with error handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .catch((err) => {
        console.debug('SW registration failed:', err.message);
        // Fail silently - app still works without SW
      });
  });
}

// Add global error handler for network issues
window.addEventListener('error', (event) => {
  if (event.message && event.message.includes('fetch')) {
    console.error('Network error detected:', event.error);
  }
});

// Show loading indicator while app initializes
const root = document.getElementById('root');
if (root && root.children.length === 0) {
  root.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: system-ui, -apple-system, sans-serif;
      background: #faf8f3;
    ">
      <div style="text-align: center;">
        <div style="
          width: 40px;
          height: 3px;
          background: #a68068;
          margin: 0 auto 20px;
          animation: pulse 1.5s ease-in-out infinite;
        "></div>
        <p style="color: #666; font-size: 14px; margin: 0;">Loading erdh...</p>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      </style>
    </div>
  `;
}

createRoot(root!).render(<App />);
