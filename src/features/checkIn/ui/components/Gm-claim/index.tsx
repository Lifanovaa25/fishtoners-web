
import clsx from 'clsx'
import Countdown from 'react-countdown';

import s from './style.module.scss';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { appSlice } from 'store/reducers/appSlice';
import { claimTodayReward } from 'store/apis';
import { FC } from 'react';

interface IProps {
	fishNumber:number
}

export const GmClaim: FC<IProps> = ({ fishNumber}) => {
    const { t } = useTranslation()
    const { allfishes,initDataRow } = useAppSelector((state) => state.appSlice);
    const { setInitDataRow } = appSlice.actions;
    console.log('setInitDataRow:' + setInitDataRow)

    const dispatch = useAppDispatch();

    const nextCheckIn = allfishes?.nextFishDate?.getTime()??0;
    const isClaim = allfishes.fishes?.find((x) => x.id == fishNumber);

    const onClaim = () => {
        if (isClaim) {
            dispatch(claimTodayReward({ tma: initDataRow }));
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