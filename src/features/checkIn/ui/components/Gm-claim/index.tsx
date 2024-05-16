import { useUnit } from 'effector-react'
import { $userProfile } from 'shared/config/user'
import { CURRENT_UNIXTIME, DAY_UNIXTIME } from 'shared/config';
import clsx from 'clsx'
import Countdown from 'react-countdown';

import s from './style.module.scss';
import { api } from 'shared/api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const GmClaim = () => {
    const { t } = useTranslation()
    const [profile, onUpdateUserGm] = useUnit([$userProfile, api.users.update.updateUserGmFx]);
    const nextCheckIn = (profile?.last_claim ?? 0) + DAY_UNIXTIME - CURRENT_UNIXTIME
    const isClaim = profile && (
        profile.last_claim === null ||
        nextCheckIn <= 0
    );

    const onClaim = () => {
        if (isClaim) {
            onUpdateUserGm({})
            toast(t('notifications.claim'), {
                type: 'success'
            })
        }
    }

    return (
        <button
            onClick={onClaim}
            className={clsx(s.gm_btn, { [s.gm_disable]: !isClaim })}
        >
            <span className={clsx(s.text, "shadow")}>
                {!isClaim ?
                    <span className={s.disable_text}>
                        Next check in
                        <div className={s.timer}>
                            <TimerClaim
                                remained={nextCheckIn}
                            />
                        </div>
                    </span>
                    :
                    'GM'
                }

            </span>
        </button>
    )
}

const formatTime = (time: number) => time < 10 ? `0${time}` : time;
const formatHours = (days: number, hours: number) => formatTime(days * 24 + hours);

const TimerClaim = ({
    remained
}: { remained: number }) => {
    return (
        <Countdown
            date={Date.now() + remained * 1000}
            renderer={({ days, hours, minutes, seconds }) => (
                ` ${formatHours(days, hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
            )}
        />
    )
}