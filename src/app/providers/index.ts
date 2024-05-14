import compose from 'compose-function';

import { withErrorBoundary } from './with-errorboundary';
import { withSuspense } from './with-suspense';
import { withToast } from './with-toast';

export const withProviders = compose(
  withErrorBoundary,
  withSuspense,
  withToast
);

export {WithInitData} from './with-init-data'