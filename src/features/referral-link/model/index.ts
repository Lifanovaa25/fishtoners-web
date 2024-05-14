import {
    createStore, createEvent, sample, createEffect
} from 'effector';
import { t } from 'i18next';
import { delay } from 'patronum';
import { toast } from 'react-toastify';
import { $initDataUnsafe, initDataUnsafeType } from 'shared/config/telegram';

// export const link = `https://t.me/fishtoners_bot?start=`;
export const link = `${__BOT_LINK__}?start=`;

export const copyClicked = createEvent();
const copyRefferalLink = createEffect((link: string | null) => {
    if(link) {
        navigator.clipboard.writeText(link)
        toast(t('notifications.copy_referral'), {
            type: 'success'
        })
    }
});
export const $isCopied = createStore<boolean>(false);

sample({
    clock: copyClicked,
    source: [$initDataUnsafe, $isCopied],
    filter: ([_, isCopied]) => !isCopied,
    // @ts-ignore
    fn: ([user, _]: [initDataUnsafeType, boolean]): string => `${link}${user?.username ?? 0}`,
    target: copyRefferalLink
});

sample({
    clock: copyRefferalLink.done,
    fn: () => true,
    target: $isCopied
});

sample({
    clock: delay({ source: copyRefferalLink.done, timeout: 3000 }),
    fn: () => false,
    target: $isCopied
});
  