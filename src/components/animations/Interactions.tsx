import { useEffect } from 'react';
import { prefersReducedMotion } from './motion-utils';

const MAGNETIC_RADIUS = 70;

export const Interactions = () => {
  useEffect(() => {
    if (
      prefersReducedMotion() ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    const magnets = new Set<HTMLElement>();
    const magnetOffsets = new Map<HTMLElement, { x: number; y: number }>();
    const collect = () => {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => magnets.add(el));
    };
    collect();

    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(collect);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-tilt]') : null;
      document.querySelectorAll<HTMLElement>('[data-tilt].ae-spot').forEach((card) => {
        if (card === target) {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          card.style.setProperty('--mx', `${x * 100}%`);
          card.style.setProperty('--my', `${y * 100}%`);

          const maxTilt = Number.parseFloat(card.dataset.tilt ?? '') || 8;
          const rotateX = (0.5 - y) * maxTilt;
          const rotateY = (x - 0.5) * maxTilt;
          const angle = Math.hypot(rotateX, rotateY);
          const axisX = -rotateY / (angle || 1);
          const axisY = rotateX / (angle || 1);
          card.style.setProperty('rotate', `${axisX} ${axisY} 0 ${angle}deg`);
        } else {
          card.style.removeProperty('rotate');
        }
      });

      magnets.forEach((el) => {
        if (!el.isConnected) {
          magnets.delete(el);
          return;
        }
        const rect = el.getBoundingClientRect();
        const previous = magnetOffsets.get(el) ?? { x: 0, y: 0 };
        const left = rect.left - previous.x;
        const top = rect.top - previous.y;
        const active =
          event.clientX > left - MAGNETIC_RADIUS &&
          event.clientX < left + rect.width + MAGNETIC_RADIUS &&
          event.clientY > top - MAGNETIC_RADIUS &&
          event.clientY < top + rect.height + MAGNETIC_RADIUS;
        if (!active) {
          el.style.removeProperty('translate');
          magnetOffsets.delete(el);
          return;
        }
        const strength = Number.parseFloat(el.dataset.magnetic ?? '') || 0.35;
        const x = (event.clientX - (left + rect.width / 2)) * strength;
        const y = (event.clientY - (top + rect.height / 2)) * strength;
        magnetOffsets.set(el, { x, y });
        el.style.setProperty('translate', `${x}px ${y}px`);
      });
    };

    const reset = () => {
      magnets.forEach((el) => el.style.removeProperty('translate'));
      magnetOffsets.clear();
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
        el.style.removeProperty('rotate');
      });
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', reset);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', reset);
      reset();
    };
  }, []);

  return null;
};
