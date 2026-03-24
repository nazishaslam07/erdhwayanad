/**
 * Detect network quality and device capabilities
 * Returns adaptive loading strategy for slow connections
 */

export type ConnectionQuality = 'fast' | 'slow' | 'unknown';

export const detectConnectionQuality = (): ConnectionQuality => {
  if (!navigator.connection && !('connection' in navigator)) {
    return 'unknown';
  }

  const connection = (navigator as any).connection || {};
  const type = connection.effectiveType;
  const downlink = connection.downlink;
  const rtt = connection.rtt;
  const saveData = (navigator as any).connection?.saveData;

  // If user has data saver enabled, treat as slow
  if (saveData) return 'slow';

  // 4g with good RTT = fast
  if (type === '4g' && rtt < 50) return 'fast';

  // 3g, slow 4g, or elevated RTT = slow
  if (type === '3g' || type === '2g' || rtt > 150) return 'slow';

  // Default to fast if modern connection
  if (type === '4g') return 'fast';

  return 'unknown';
};

/**
 * Get adaptive loading config based on connection quality
 */
export const getAdaptiveConfig = (quality: ConnectionQuality) => ({
  disableAnimations: quality === 'slow',
  deferImages: quality === 'slow',
  reduceChunkSize: quality === 'slow',
  showSimpleFallback: quality === 'slow',
  enableServiceWorker: true,
  prefetchCritical: quality !== 'slow',
  fetchTimeout: quality === 'slow' ? 45000 : 30000, // 45s for slow, 30s for others
});

/**
 * Monitor connection quality changes
 */
export const onConnectionChange = (callback: (quality: ConnectionQuality) => void) => {
  if (!navigator.connection) return;

  (navigator.connection as any).addEventListener('change', () => {
    callback(detectConnectionQuality());
  });
};

/**
 * Simulate network delay for testing (development only)
 */
export const getSimulatedDelay = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('slow-network')) {
    return parseInt(params.get('slow-network') || '500', 10);
  }
  return 0;
};
