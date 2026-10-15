import { useEffect } from 'react';
import { onReady, prefersReducedMotion } from './motion-utils';

const SELECTOR =
  '[data-reveal],[data-stagger],[data-split],[data-counter],[data-parallax],[data-float],[data-draw],[data-marquee]';

const parseNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseFloat(value ?? '');
  return Number.isFinite(parsed) ? parsed : fallback;
};

const revealVariant = (type: string) => {
  if (type === 'left') return { x: -34, y: 0 };
  if (type === 'right') return { x: 34, y: 0 };
  if (type === 'scale') return { x: 0, y: 0, scale: 0.94 };
  if (type === 'fade') return { x: 0, y: 0 };
  return { x: 0, y: 24 };
};

const makeSplitWords = (element: HTMLElement) => {
  const words: HTMLElement[] = [];
  element.setAttribute('aria-label', (element.textContent ?? '').trim());

  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        (child.textContent ?? '').split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part));
            return;
          }
          const mask = document.createElement('span');
          mask.className = 'ae-split-mask';
          mask.setAttribute('aria-hidden', 'true');
          const word = document.createElement('span');
          word.className = 'ae-split-word';
          word.textContent = part;
          mask.appendChild(word);
          fragment.appendChild(mask);
          words.push(word);
        });
        node.replaceChild(fragment, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };

  walk(element);
  return words;
};

const animateIn = (element: HTMLElement, type = 'up', delay = 0) => {
  const from = revealVariant(type);
  const keyframes: Keyframe[] =
    type === 'mask'
      ? [
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)' },
        ]
      : [
          {
            opacity: 0,
            transform: `translate3d(${from.x}px, ${from.y}px, 0) scale(${from.scale ?? 1})`,
          },
          { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
        ];
  const animation = element.animate(keyframes, {
    duration: type === 'mask' ? 900 : 650,
    delay: delay * 1000,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    fill: 'both',
  });
  animation.onfinish = () => {
    animation.cancel();
    element.style.removeProperty('opacity');
  };
};

export const ScrollAnimations = () => {
  useEffect(() => {
    let cancelled = false;
    let mutationObserver: MutationObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let scanFrame = 0;
    let scrollFrame = 0;
    const initialized = new WeakSet<HTMLElement>();
    const trackedScrollEffects = new Set<HTMLElement>();
    const trackedDrawEffects = new Set<HTMLElement>();

    const scan = () => {
      if (cancelled || prefersReducedMotion()) return;
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((element) => {
        if (initialized.has(element)) return;
        initialized.add(element);

        if (element.hasAttribute('data-split')) {
          const words = makeSplitWords(element);
          words.forEach((word, index) => {
            word.style.translate = '0 110%';
            intersectionObserver?.observe(element);
            word.dataset.aeSplitIndex = String(index);
          });
        }
        if (element.hasAttribute('data-reveal')) {
          element.style.opacity = '0';
          intersectionObserver?.observe(element);
        }
        if (element.hasAttribute('data-stagger')) {
          Array.from(element.children).forEach((child) => {
            if (child instanceof HTMLElement) {
              child.style.opacity = '0';
              intersectionObserver?.observe(child);
            }
          });
        }
        if (element.hasAttribute('data-counter')) intersectionObserver?.observe(element);
        if (
          element.hasAttribute('data-parallax') ||
          element.hasAttribute('data-float') ||
          element.hasAttribute('data-draw')
        ) {
          trackedScrollEffects.add(element);
          if (element.hasAttribute('data-draw')) trackedDrawEffects.add(element);
        }
        if (element.hasAttribute('data-marquee') && !element.classList.contains('animate-marquee')) {
          element.classList.add('ae-marquee-track');
          element.style.setProperty(
            '--marquee-duration',
            `${parseNumber(element.dataset.marquee, 40)}s`
          );
        }
      });
    };

    const reveal = (element: HTMLElement) => {
      const splitWords = Array.from(element.querySelectorAll<HTMLElement>('.ae-split-word'));
      if (splitWords.length) {
        splitWords.forEach((word, index) => {
          const animation = word.animate(
            [{ translate: '0 110%' }, { translate: '0 0' }],
            {
              duration: 850,
              delay: index * 55 + parseNumber(element.dataset.splitDelay, 0) * 1000,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'both',
            }
          );
          animation.onfinish = () => {
            animation.cancel();
            word.style.removeProperty('translate');
          };
        });
      }

      if (element.hasAttribute('data-reveal')) {
        animateIn(element, element.dataset.reveal, parseNumber(element.dataset.revealDelay, 0));
      }

      const staggerParent = element.parentElement?.closest<HTMLElement>('[data-stagger]');
      if (staggerParent && element.parentElement === staggerParent) {
        const delay = parseNumber(staggerParent.dataset.stagger, 0.1);
        const index = Array.from(staggerParent.children).indexOf(element);
        animateIn(element, 'up', index * delay);
      }

      if (element.hasAttribute('data-counter')) {
        const raw = (element.textContent ?? '').trim();
        const match = raw.match(/^(\D*?)([\d,]*\.?\d+)(.*)$/);
        const target = parseNumber(element.dataset.counter, match ? Number(match[2].replace(/,/g, '')) : NaN);
        if (Number.isFinite(target)) {
          const prefix = element.dataset.prefix ?? match?.[1] ?? '';
          const suffix = element.dataset.suffix ?? match?.[3] ?? '';
          const decimals = (match?.[2].split('.')[1] ?? '').length;
          const grouped = raw.includes(',');
          const width = element.getBoundingClientRect().width;
          if (getComputedStyle(element).display === 'inline') element.style.display = 'inline-block';
          element.style.minWidth = `${width}px`;
          const startedAt = performance.now();
          const duration = 1500;
          const tick = (now: number) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            const value = target * (1 - Math.pow(1 - progress, 3));
            element.textContent = `${prefix}${value.toLocaleString('en-US', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
              useGrouping: grouped,
            })}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
            else element.textContent = `${prefix}${target.toLocaleString('en-US', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
              useGrouping: grouped,
            })}${suffix}`;
          };
          requestAnimationFrame(tick);
        }
      }
    };

    const updateScrollEffects = () => {
      scrollFrame = 0;
      trackedScrollEffects.forEach((element) => {
        if (!element.isConnected) {
          trackedScrollEffects.delete(element);
          trackedDrawEffects.delete(element);
          return;
        }
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
        if (element.hasAttribute('data-parallax')) {
          const strength = parseNumber(element.dataset.parallax, 0.12);
          element.style.setProperty('translate', `0 ${((progress - 0.5) * strength * -100).toFixed(1)}px`);
        }
        if (element.hasAttribute('data-float')) {
          const strength = parseNumber(element.dataset.float, 0.2);
          element.style.setProperty('translate', `0 ${((0.5 - progress) * strength * 160).toFixed(1)}px`);
        }
        if (trackedDrawEffects.has(element)) {
          const horizontal = element.dataset.draw === 'x';
          const drawProgress = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - rect.top) / Math.max(rect.height, 1)));
          element.style.setProperty('scale', horizontal ? `${drawProgress} 1` : `1 ${drawProgress}`);
        }
      });
    };

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollEffects);
    };

    const start = () => {
      if (cancelled) return;
      if (prefersReducedMotion()) return;
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting || !(target instanceof HTMLElement)) return;
            intersectionObserver?.unobserve(target);
            reveal(target);
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
      );
      scan();
      mutationObserver = new MutationObserver((mutations) => {
        if (!mutations.some((mutation) => mutation.addedNodes.length)) return;
        cancelAnimationFrame(scanFrame);
        scanFrame = requestAnimationFrame(scan);
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      onScroll();
    };

    const stopReadyListener = onReady(start);
    return () => {
      cancelled = true;
      stopReadyListener();
      mutationObserver?.disconnect();
      intersectionObserver?.disconnect();
      cancelAnimationFrame(scanFrame);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
};
