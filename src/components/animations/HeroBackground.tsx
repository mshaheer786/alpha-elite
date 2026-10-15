import { lazy, Suspense } from 'react';

const ParticleField = lazy(() =>
  import('./ParticleField').then(({ ParticleField: Scene }) => ({ default: Scene }))
);

export const HeroBackground = () => (
  <div aria-hidden="true" className="ae-hero-bg">
    <div className="ae-mesh ae-mesh-1" />
    <div className="ae-mesh ae-mesh-2" />
    <div className="ae-mesh ae-mesh-3" />
    <Suspense fallback={null}>
      <ParticleField />
    </Suspense>
    <div className="ae-hero-vignette" />
  </div>
);
