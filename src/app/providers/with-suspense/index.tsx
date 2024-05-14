import { ReactNode, Suspense } from 'react';
import { PageLoader } from 'widgets/others-pages';

export const withSuspense = (component: () => ReactNode) => () => (
  <Suspense fallback={<PageLoader />}>{component()}</Suspense>
);
