import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';

const platformNames = ['eBay', 'Shopify', 'Amazon', 'TikTok Shop', 'Walmart'] as const;

interface Hero3DCanvasProps {
  className?: string;
  heroSectionRef: React.RefObject<HTMLElement | null>;
  platformsSectionRef: React.RefObject<HTMLElement | null>;
  onPlatformHighlight: (platform: string | null) => void;
}

interface ElectronActions {
  hover: (index: number | null) => void;
  toggle: (index: number) => void;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  className = '',
  heroSectionRef,
  platformsSectionRef,
  onPlatformHighlight,
}) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const networkSvgRef = useRef<SVGSVGElement | null>(null);
  const networkParallaxRef = useRef<SVGGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const labelRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const electronActionsRef = useRef<ElectronActions | null>(null);
  const onPlatformHighlightRef = useRef(onPlatformHighlight);
  const [mounted, setMounted] = useState(false);
  const [webglEnabled, setWebglEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [sceneVisible, setSceneVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);

    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const svg = networkSvgRef.current;
    const parallaxGroup = networkParallaxRef.current;
    if (!mounted || !svg || !parallaxGroup) return;

    if (reducedMotion) {
      svg.classList.remove('ae-net-active', 'ae-net-paused');
      svg.removeAttribute('data-net-hover');
      parallaxGroup.style.removeProperty('--ae-net-x');
      parallaxGroup.style.removeProperty('--ae-net-y');
      parallaxGroup.style.removeProperty('--ae-net-rotate');
      return;
    }

    let inViewport = false;
    let hasEntered = false;
    const syncPlayback = () => {
      if (inViewport && !document.hidden) {
        hasEntered = true;
        svg.classList.add('ae-net-active');
        svg.classList.remove('ae-net-paused');
      } else if (hasEntered) {
        svg.classList.add('ae-net-paused');
      }
    };

    const updateViewport = () => {
      const bounds = svg.getBoundingClientRect();
      inViewport = bounds.bottom > 0 && bounds.top < window.innerHeight;
      syncPlayback();
    };

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        inViewport = entry.isIntersecting;
        syncPlayback();
      }, { threshold: 0.15 });
      observer.observe(svg);
    } else {
      updateViewport();
      window.addEventListener('scroll', updateViewport, { passive: true });
      window.addEventListener('resize', updateViewport);
    }

    const handleVisibilityChange = () => syncPlayback();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateParallax = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = svg.getBoundingClientRect();
      const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1) * 2 - 1;
      const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1) * 2 - 1;
      parallaxGroup.style.setProperty('--ae-net-x', `${x * 8}px`);
      parallaxGroup.style.setProperty('--ae-net-y', `${y * 8}px`);
      parallaxGroup.style.setProperty('--ae-net-rotate', `${y * -1.6}deg`);

      const target = event.target instanceof Element ? event.target : null;
      const labeledNode = target?.closest<SVGElement>('[data-net-label], [data-net-node]');
      const hoveredNode =
        labeledNode?.getAttribute('data-net-label') ??
        labeledNode?.getAttribute('data-net-node');
      if (hoveredNode) svg.setAttribute('data-net-hover', hoveredNode);
      else svg.removeAttribute('data-net-hover');
    };
    const resetParallax = () => {
      parallaxGroup.style.setProperty('--ae-net-x', '0px');
      parallaxGroup.style.setProperty('--ae-net-y', '0px');
      parallaxGroup.style.setProperty('--ae-net-rotate', '0deg');
      svg.removeAttribute('data-net-hover');
    };

    if (finePointer.matches) {
      svg.addEventListener('pointermove', updateParallax, { passive: true });
      svg.addEventListener('pointerleave', resetParallax);
    }

    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', updateViewport);
      window.removeEventListener('resize', updateViewport);
      svg.removeEventListener('pointermove', updateParallax);
      svg.removeEventListener('pointerleave', resetParallax);
      svg.classList.remove('ae-net-active', 'ae-net-paused');
      svg.removeAttribute('data-net-hover');
    };
  }, [mounted, reducedMotion]);

  useEffect(() => {
    onPlatformHighlightRef.current = onPlatformHighlight;
  }, [onPlatformHighlight]);

  useEffect(() => {
    if (!mounted) return;

    const sections = [heroSectionRef.current, platformsSectionRef.current].filter(
      (section): section is HTMLElement => section !== null
    );
    const updateVisibility = () => {
      setSceneVisible(
        sections.some((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.bottom > 0 && bounds.top < window.innerHeight;
        })
      );
    };

    updateVisibility();
    if (!('IntersectionObserver' in window)) {
      window.addEventListener('scroll', updateVisibility, { passive: true });
      window.addEventListener('resize', updateVisibility);
      return () => {
        window.removeEventListener('scroll', updateVisibility);
        window.removeEventListener('resize', updateVisibility);
      };
    }

    const observer = new IntersectionObserver(updateVisibility);
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [heroSectionRef, mounted, platformsSectionRef]);

  useEffect(() => {
    const anchor = anchorRef.current;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!mounted || !anchor || !canvas || !wrapper || reducedMotion) {
      setWebglEnabled(false);
      onPlatformHighlightRef.current(null);
      return;
    }

    let context: WebGL2RenderingContext | WebGLRenderingContext | null = null;
    try {
      context =
        canvas.getContext('webgl2', {
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        }) ??
        canvas.getContext('webgl', {
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        });
    } catch (error) {
      console.error('Unable to initialize WebGL for the hero scene.', error);
    }

    if (!context) {
      console.warn('WebGL is unavailable; showing the static hero scene fallback.');
      setWebglEnabled(false);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch (error) {
      console.error('Unable to create the Three.js hero renderer.', error);
      setWebglEnabled(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 9.2);

    const atom = new THREE.Group();
    scene.add(atom);

    const makeGlowTexture = () => {
      const glowCanvas = document.createElement('canvas');
      glowCanvas.width = 128;
      glowCanvas.height = 128;
      const context2d = glowCanvas.getContext('2d');
      if (!context2d) return null;

      const gradient = context2d.createRadialGradient(64, 64, 1, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 94, 96, 0.95)');
      gradient.addColorStop(0.18, 'rgba(200, 40, 45, 0.55)');
      gradient.addColorStop(0.48, 'rgba(200, 40, 45, 0.15)');
      gradient.addColorStop(1, 'rgba(200, 40, 45, 0)');
      context2d.fillStyle = gradient;
      context2d.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(glowCanvas);
    };

    const glowTexture = makeGlowTexture();
    if (glowTexture) {
      const nucleusGlow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture,
          color: 0xc8282d,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      nucleusGlow.scale.set(2.2, 2.2, 1);
      atom.add(nucleusGlow);
    }

    const nucleus = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xff4549 })
    );
    atom.add(nucleus);

    const phi = (1 + Math.sqrt(5)) / 2;
    const vertexScale = 1.38 / Math.sqrt(1 + phi * phi);
    const vertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ].map(([x, y, z]) => new THREE.Vector3(x, y, z).multiplyScalar(vertexScale));
    const platformVertexIndexes = [0, 3, 6, 9, 1];
    const edgeVertices: number[] = [];
    const edgeLength = vertices[0].distanceTo(vertices[1]);
    for (let first = 0; first < vertices.length; first += 1) {
      for (let second = first + 1; second < vertices.length; second += 1) {
        if (Math.abs(vertices[first].distanceTo(vertices[second]) - edgeLength) < 0.001) {
          edgeVertices.push(
            vertices[first].x, vertices[first].y, vertices[first].z,
            vertices[second].x, vertices[second].y, vertices[second].z
          );
        }
      }
    }

    const wireGeometry = new THREE.BufferGeometry();
    wireGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(edgeVertices, 3)
    );
    const wireframe = new THREE.LineSegments(
      wireGeometry,
      new THREE.LineBasicMaterial({
        color: 0x8e2529,
        transparent: true,
        opacity: 0.56,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    atom.add(wireframe);

    const platformNodes: THREE.Mesh[] = [];
    vertices.forEach((vertex, vertexIndex) => {
      const platformIndex = platformVertexIndexes.indexOf(vertexIndex);
      const isPlatformNode = platformIndex >= 0;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(isPlatformNode ? 0.085 : 0.045, 16, 16),
        new THREE.MeshBasicMaterial({
          color: isPlatformNode ? 0xff686b : 0xc8282d,
        })
      );
      node.position.copy(vertex);
      if (isPlatformNode) {
        node.userData.platformIndex = platformIndex;
        platformNodes.push(node);
      }
      atom.add(node);

      if (glowTexture) {
        const nodeGlow = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTexture,
            color: 0xc8282d,
            transparent: true,
            opacity: isPlatformNode ? 0.62 : 0.3,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        const glowSize = isPlatformNode ? 0.48 : 0.28;
        nodeGlow.scale.set(glowSize, glowSize, 1);
        node.add(nodeGlow);
      }
    });

    const particleCount = window.innerWidth < 768 ? 300 : 800;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleAlphas = new Float32Array(particleCount);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 9;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 6.4;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 7;
      particleAlphas[index] = 0.25 + Math.random() * 0.7;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      'aAlpha',
      new THREE.BufferAttribute(particleAlphas, 1)
    );
    particleGeometry.frustumCulled = false;

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float aAlpha;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec3 driftingPosition = position;
          driftingPosition.x += sin(uTime * 0.22 + position.y * 1.7) * 0.12;
          driftingPosition.y += cos(uTime * 0.18 + position.x * 1.3) * 0.09;
          vec4 viewPosition = modelViewMatrix * vec4(driftingPosition, 1.0);
          gl_Position = projectionMatrix * viewPosition;
          gl_PointSize = clamp(2.2 * (180.0 / -viewPosition.z), 1.0, 4.0);
          vAlpha = aAlpha * (0.68 + 0.32 * sin(uTime * 0.6 + position.z));
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
          float glow = 1.0 - smoothstep(0.06, 0.5, distanceFromCenter);
          gl_FragColor = vec4(1.0, 0.22, 0.24, glow * vAlpha);
        }
      `,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const redLight = new THREE.PointLight(0xc8282d, 5, 6);
    redLight.position.set(0, 0, 1.8);
    scene.add(redLight);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const projectedPosition = new THREE.Vector3();
    let hoveredIndex: number | null = null;
    let selectedIndex: number | null = null;
    let activeIndex: number | null = null;
    let mouseTiltX = 0;
    let mouseTiltY = 0;
    let progress = 0;
    let elapsed = 0;
    let lastFrameTime = 0;
    let frameId = 0;
    let positionFrameId = 0;
    let rendering = false;
    let heroVisible = false;
    let platformsVisible = false;
    let visibilityFallback: (() => void) | null = null;
    let rendererWidth = 0;
    let rendererHeight = 0;
    let particleBucket = window.innerWidth < 768 ? 300 : 800;

    const updateActiveIndex = () => {
      activeIndex = hoveredIndex ?? selectedIndex;
      setHighlightedIndex(activeIndex);
      onPlatformHighlightRef.current(
        activeIndex === null ? null : platformNames[activeIndex]
      );
    };

    const setHover = (index: number | null) => {
      if (hoveredIndex === index) return;
      hoveredIndex = index;
      updateActiveIndex();
    };

    const toggleSelection = (index: number) => {
      selectedIndex = selectedIndex === index ? null : index;
      updateActiveIndex();
    };

    electronActionsRef.current = { hover: setHover, toggle: toggleSelection };

    const resizeRenderer = () => {
      const bounds = anchor.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      if (width !== rendererWidth || height !== rendererHeight) {
        rendererWidth = width;
        rendererHeight = height;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      const nextBucket = window.innerWidth < 768 ? 300 : 800;
      if (nextBucket !== particleBucket) {
        particleBucket = nextBucket;
        const nextPositions = new Float32Array(particleBucket * 3);
        const nextAlphas = new Float32Array(particleBucket);
        for (let index = 0; index < particleBucket; index += 1) {
          nextPositions[index * 3] = (Math.random() - 0.5) * 9;
          nextPositions[index * 3 + 1] = (Math.random() - 0.5) * 6.4;
          nextPositions[index * 3 + 2] = (Math.random() - 0.5) * 7;
          nextAlphas[index] = 0.25 + Math.random() * 0.7;
        }
        particleGeometry.setAttribute(
          'position',
          new THREE.BufferAttribute(nextPositions, 3)
        );
        particleGeometry.setAttribute(
          'aAlpha',
          new THREE.BufferAttribute(nextAlphas, 1)
        );
      }
    };

    const updatePosition = () => {
      positionFrameId = 0;
      const source = anchor.getBoundingClientRect();
      const platformBounds = platformsSectionRef.current?.getBoundingClientRect();
      const heroBounds = heroSectionRef.current?.getBoundingClientRect();
      const intersectsViewport = (bounds: DOMRect | undefined) =>
        !!bounds && bounds.bottom > 0 && bounds.top < window.innerHeight;
      const nextSceneVisible =
        intersectsViewport(heroBounds) || intersectsViewport(platformBounds);
      setSceneVisible(nextSceneVisible);
      const startDocumentY =
        heroBounds ? heroBounds.top + window.scrollY : window.scrollY;
      const endDocumentY = platformBounds
        ? platformBounds.top + window.scrollY
        : startDocumentY + window.innerHeight;
      const nextProgress = reducedMotion
        ? 0
        : clamp(
            (window.scrollY - startDocumentY) /
              Math.max(1, endDocumentY - startDocumentY),
            0,
            1
          );
      progress = nextProgress;
      const finalSize = clamp(window.innerWidth * 0.14, 96, 176);
      const finalLeft = Math.max(12, window.innerWidth - finalSize - 24);
      const finalTop = (platformBounds?.top ?? source.top) + 24;
      const scale = reducedMotion
        ? 1
        : 1 + (finalSize / Math.max(1, source.width) - 1) * progress;
      const left = reducedMotion
        ? source.left
        : source.left + (finalLeft - source.left) * progress;
      const top = reducedMotion
        ? source.top
        : source.top + (finalTop - source.top) * progress;

      wrapper.style.width = `${source.width}px`;
      wrapper.style.height = `${source.height}px`;
      wrapper.style.transform = `translate3d(${left}px, ${top}px, 0) scale(${scale})`;
      wrapper.style.opacity = `${1 - progress * 0.22}`;
      resizeRenderer();
    };

    const schedulePositionUpdate = () => {
      if (!positionFrameId) {
        positionFrameId = window.requestAnimationFrame(updatePosition);
      }
    };

    const updatePointer = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest('[data-electron-label]')) {
        return;
      }

      const bounds = canvas.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        mouseTiltX = 0;
        mouseTiltY = 0;
        setHover(null);
        return;
      }

      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      mouseTiltX = -pointer.y * 0.2;
      mouseTiltY = pointer.x * 0.24;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(platformNodes, false)[0];
      setHover(
        hit ? (hit.object.userData.platformIndex as number) : null
      );
    };

    const selectElectron = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest('[data-electron-label]')) {
        return;
      }

      const bounds = canvas.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        return;
      }

      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(platformNodes, false)[0];
      if (hit) {
        toggleSelection(hit.object.userData.platformIndex as number);
      } else if (event.pointerType === 'touch') {
        selectedIndex = null;
        updateActiveIndex();
      }
    };

    const tick = (time: number) => {
      if (!rendering) return;
      const delta = lastFrameTime
        ? Math.min((time - lastFrameTime) / 1000, 0.05)
        : 0;
      lastFrameTime = time;
      elapsed += delta;

      atom.rotation.x += (0.28 + mouseTiltX - atom.rotation.x) * 0.035;
      atom.rotation.y = elapsed * 0.2 + progress * 1.35 + mouseTiltY;
      atom.rotation.z = Math.sin(elapsed * 0.16) * 0.08;
      particleMaterial.uniforms.uTime.value = elapsed + progress * 8;

      platformNodes.forEach((node, index) => {
        const focused = activeIndex === index;
        node.scale.setScalar(focused ? 1.42 : 1);
        const glow = node.children[0];
        if (glow instanceof THREE.Sprite) {
          glow.material.opacity = focused ? 0.98 : 0.62;
        }
        node.updateWorldMatrix(true, false);
        node.getWorldPosition(projectedPosition);
        projectedPosition.project(camera);
        const label = labelRefs.current[index];
        if (label) {
          label.style.left = `${(projectedPosition.x * 0.5 + 0.5) * rendererWidth}px`;
          label.style.top = `${(1 - (projectedPosition.y * 0.5 + 0.5)) * rendererHeight - 18}px`;
        }
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(tick);
    };

    const syncRendering = () => {
      const shouldRender = heroVisible || platformsVisible;
      if (shouldRender && !rendering) {
        rendering = true;
        lastFrameTime = 0;
        frameId = window.requestAnimationFrame(tick);
      } else if (!shouldRender && rendering) {
        rendering = false;
        window.cancelAnimationFrame(frameId);
      }
    };

    updatePosition();
    setWebglEnabled(true);

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroSectionRef.current) {
            heroVisible = entry.isIntersecting;
          } else if (entry.target === platformsSectionRef.current) {
            platformsVisible = entry.isIntersecting;
          }
        });
        setSceneVisible(heroVisible || platformsVisible);
        syncRendering();
      });
      if (heroSectionRef.current) observer.observe(heroSectionRef.current);
      if (platformsSectionRef.current) {
        observer.observe(platformsSectionRef.current);
      }
    } else {
      const visibleInViewport = (element: HTMLElement | null) => {
        if (!element) return false;
        const bounds = element.getBoundingClientRect();
        return bounds.bottom > 0 && bounds.top < window.innerHeight;
      };
      const updateVisibility = () => {
        heroVisible = visibleInViewport(heroSectionRef.current);
        platformsVisible = visibleInViewport(platformsSectionRef.current);
        setSceneVisible(heroVisible || platformsVisible);
        syncRendering();
      };
      visibilityFallback = updateVisibility;
      window.addEventListener('scroll', updateVisibility, { passive: true });
      window.addEventListener('resize', updateVisibility);
      updateVisibility();
    }

    window.addEventListener('scroll', schedulePositionUpdate, { passive: true });
    window.addEventListener('resize', schedulePositionUpdate);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerdown', selectElectron, { passive: true });

    const resizeObserver =
      'ResizeObserver' in window
        ? new ResizeObserver(schedulePositionUpdate)
        : null;
    resizeObserver?.observe(anchor);

    return () => {
      rendering = false;
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(positionFrameId);
      observer?.disconnect();
      resizeObserver?.disconnect();
      if (visibilityFallback) {
        window.removeEventListener('scroll', visibilityFallback);
        window.removeEventListener('resize', visibilityFallback);
      }
      window.removeEventListener('scroll', schedulePositionUpdate);
      window.removeEventListener('resize', schedulePositionUpdate);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerdown', selectElectron);
      electronActionsRef.current = null;
      onPlatformHighlightRef.current(null);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        } else if (object instanceof THREE.Sprite) {
          object.material.dispose();
        }
      });
      glowTexture?.dispose();
      renderer.dispose();
    };
  }, [heroSectionRef, mounted, platformsSectionRef, reducedMotion]);

  const portal =
    mounted && !reducedMotion && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={wrapperRef}
            className="fixed left-0 top-0 z-[11] pointer-events-none overflow-hidden"
            style={{
              transformOrigin: 'top left',
              willChange: 'transform',
              opacity: webglEnabled ? 1 : 0.9,
            }}
            aria-label="Interactive atom showing five e-commerce platforms"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(200,40,45,0.3), rgba(200,40,45,0.07) 42%, transparent 72%)',
              }}
              aria-hidden="true"
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
              style={{ display: webglEnabled ? 'block' : 'none' }}
            />
            {webglEnabled &&
              platformNames.map((platform, index) => (
                <button
                  key={platform}
                  ref={(element) => {
                    labelRefs.current[index] = element;
                  }}
                  type="button"
                  data-electron-label
                  aria-label={`Highlight ${platform} platform`}
                  aria-pressed={highlightedIndex === index}
                  onPointerEnter={() => electronActionsRef.current?.hover(index)}
                  onPointerLeave={() => electronActionsRef.current?.hover(null)}
                  onClick={() => electronActionsRef.current?.toggle(index)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-1 py-0.5 text-[10px] font-medium leading-none text-shadow-[0_0_8px_#000] transition-colors pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8282D] ${
                    highlightedIndex === index
                      ? 'text-white'
                      : 'text-neutral-300 hover:text-[#ff777a]'
                  }`}
                  style={{ left: 0, top: 0 }}
                >
                  {platform}
                </button>
              ))}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div
        ref={anchorRef}
        className={`relative h-full w-full min-h-[340px] pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(200,40,45,0.24), rgba(200,40,45,0.06) 46%, transparent 74%)',
          }}
        />
        {!webglEnabled && (
          <svg
            ref={networkSvgRef}
            viewBox="0 0 400 340"
            className="ae-net-graphic absolute inset-0 h-full w-full"
            role="presentation"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="hologram-core">
                <stop offset="0" stopColor="#ff686b" stopOpacity="0.9" />
                <stop offset="0.28" stopColor="#C8282D" stopOpacity="0.42" />
                <stop offset="1" stopColor="#C8282D" stopOpacity="0" />
              </radialGradient>
              <filter id="hologram-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g ref={networkParallaxRef} className="ae-net-parallax">
              <g className="ae-net-drift">
                <circle
                  className="ae-net-core"
                  cx="200"
                  cy="170"
                  r="74"
                  fill="url(#hologram-core)"
                />
                <circle className="ae-net-ripple" cx="200" cy="170" r="13" />
                <g
                  className="ae-net-lines"
                  fill="none"
                  stroke="#C8282D"
                  strokeOpacity="0.7"
                  strokeWidth="1"
                  filter="url(#hologram-glow)"
                >
                  <path className="ae-net-line" pathLength="1" data-net-links="shopify amazon tiktok-shop walmart" d="M200 48 264 92 284 166 235 238 165 238 116 166 136 92Z" />
                  <path className="ae-net-line" pathLength="1" data-net-links="shopify amazon tiktok-shop walmart" d="M200 48 200 112 264 92 226 146 284 166 226 188 235 238 200 212 165 238 174 188 116 166 174 146 136 92 200 112Z" />
                  <path className="ae-net-line" pathLength="1" data-net-links="shopify amazon tiktok-shop walmart" d="M136 92 226 146 200 212 116 166 264 92 174 188 284 166 200 112 165 238" />
                  <path className="ae-net-line" pathLength="1" data-net-links="amazon tiktok-shop walmart" d="M174 146 226 146 226 188 174 188Z" strokeOpacity="0.42" />
                </g>
                <g className="ae-net-flows" fill="none" stroke="#ff8587" strokeWidth="2.2" filter="url(#hologram-glow)">
                  <path className="ae-net-flow" pathLength="1" d="M200 48 264 92" />
                  <path className="ae-net-flow" pathLength="1" d="M264 92 284 166" />
                  <path className="ae-net-flow" pathLength="1" d="M284 166 235 238" />
                  <path className="ae-net-flow" pathLength="1" d="M235 238 165 238" />
                  <path className="ae-net-flow" pathLength="1" d="M165 238 116 166" />
                  <path className="ae-net-flow" pathLength="1" d="M116 166 136 92" />
                  <path className="ae-net-flow" pathLength="1" d="M136 92 200 48" />
                  <path className="ae-net-flow" pathLength="1" d="M200 112 226 146 284 166" />
                </g>
                <g className="ae-net-nodes" fill="#ff696c" filter="url(#hologram-glow)">
                  <g className="ae-net-node" data-net-node="shopify"><circle cx="200" cy="48" r="3.5" /></g>
                  <g className="ae-net-node" data-net-node="shopify"><circle cx="264" cy="92" r="3" /></g>
                  <g className="ae-net-node" data-net-node="amazon"><circle cx="284" cy="166" r="3.5" /></g>
                  <g className="ae-net-node" data-net-node="tiktok-shop"><circle cx="235" cy="238" r="3" /></g>
                  <g className="ae-net-node" data-net-node="tiktok-shop"><circle cx="165" cy="238" r="3" /></g>
                  <g className="ae-net-node" data-net-node="walmart"><circle cx="116" cy="166" r="3.5" /></g>
                  <g className="ae-net-node" data-net-node="walmart"><circle cx="136" cy="92" r="3" /></g>
                  <g className="ae-net-node"><circle cx="200" cy="112" r="3" /></g>
                  <g className="ae-net-node" data-net-node="amazon"><circle cx="226" cy="146" r="3" /></g>
                  <g className="ae-net-node"><circle cx="226" cy="188" r="3" /></g>
                  <g className="ae-net-node"><circle cx="174" cy="188" r="3" /></g>
                  <g className="ae-net-node"><circle cx="174" cy="146" r="3" /></g>
                  <g className="ae-net-center-node"><circle cx="200" cy="170" r="5" /></g>
                </g>
              </g>
              <g className="ae-net-labels" fill="#f4b4b5" fontFamily="Inter, Arial, sans-serif" fontSize="9" textAnchor="middle">
                <g className="ae-net-label" data-net-label="shopify"><text x="200" y="34">Shopify</text></g>
                <g className="ae-net-label" data-net-label="amazon"><text x="300" y="166">Amazon</text></g>
                <g className="ae-net-label" data-net-label="tiktok-shop"><text x="200" y="262">TikTok Shop</text></g>
                <g className="ae-net-label" data-net-label="walmart"><text x="100" y="166">Walmart</text></g>
              </g>
            </g>
          </svg>
        )}
      </div>
      {portal}
    </>
  );
};
