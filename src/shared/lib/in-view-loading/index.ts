import { createFactory } from '@withease/factories';
import {
  Effect, StoreShape, attach, createEvent, restore, sample
} from 'effector';

interface createDataLoadingInViewProps<argsI, sourceI> {
  effect: Effect<argsI, sourceI, Error>,
  source?: StoreShape
}

export const loadingInViewFactory = createFactory(<argsI, sourceI>({
  effect,
  source
}: createDataLoadingInViewProps<argsI, sourceI>) => {
  const loaddedData = createEvent();

  const getData = attach({
    effect,
    source: source as StoreShape
  });

  sample({
    clock: loaddedData,
    target: getData
  });

  const $data = restore(getData.doneData, null);

  return {
    loaddedData,
    $data
  };
});
