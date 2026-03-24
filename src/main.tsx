import { createRoot } from "react-dom/client";
import App from "@/components/ui/App";
import "./index.css";

// Register service worker for offline support and asset caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      console.debug('Service Worker registration failed (may be in dev mode)');
    });
  });
}

// Add network timeout handler for slow connections
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Network timeout after 30s')), 30000)
  );
  return Promise.race([originalFetch.apply(this, args), timeoutPromise]);
};

createRoot(document.getElementById("root")!).render(<App />);
