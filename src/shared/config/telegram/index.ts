import { WebAppUser } from '@vkruglikov/react-telegram-web-app';
import { createEvent, createStore } from 'effector';

export type initDataUnsafeType = WebAppUser | null;

export const settedInitDataUnsafe = createEvent<initDataUnsafeType>();
export const $initDataUnsafe = createStore<initDataUnsafeType>(null);

$initDataUnsafe.on(settedInitDataUnsafe, (_, initData) => initData);