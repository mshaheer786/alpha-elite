declare global {
  interface Window {
    __aeReady?: boolean;
  }
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function onReady(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  if (window.__aeReady || !document.querySelector('[data-ae-preloader]')) {
    callback();
    return () => {};
  }

  window.addEventListener('ae:ready', callback, { once: true });
  return () => window.removeEventListener('ae:ready', callback);
}
