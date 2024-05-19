import clsx from "clsx";
import Countdown from "react-countdown";

import s from "./style.module.scss";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { claimTodayReward } from "store/apis";
import { FC } from "react";

interface IProps {
  fishNumber: number;
  canClaim: boolean;
}

export const GmClaim: FC<IProps> = ({ fishNumber, canClaim }) => {
  const { t } = useTranslation();
  const {
    initDataRow,
    nextFishDate,
    userFishesCount
  } = useAppSelector((state) => state.appSlice);

  const dispatch = useAppDispatch();
  const diff = (nextFishDate.getTime() - new Date(Date.now()).getTime());
  const add = (fishNumber-userFishesCount-1) * 3600 * 24 * 1000

  const onClaim = () => {
    if (canClaim) {
      dispatch(claimTodayReward({ tma: initDataRow }));
      toast(t("notifications.claim"), {
        type: "success",
      });
    }
  };

  return (
    <button
      onClick={onClaim}
      className={clsx(s.gm_btn, { [s.gm_disable]: !canClaim })}
    >
      <span className={clsx(s.text, "shadow")}>
        {canClaim ? (
          <span className={s.disable_text}>
            Next check in
            <div className={s.timer}>
              <TimerClaim remained={diff+add} />
            </div>
          </span>
        ) : (
          "GM"
        )}
      </span>
    </button>
  );
};

const formatTime = (time: number) => (time < 10 ? `0${time}` : time);
const formatHours = (days: number, hours: number) =>
  formatTime(days * 24 + hours);

const TimerClaim = ({ remained }: { remained: number }) => {
  return (
    <Countdown
      date={Date.now() + remained}
      renderer={({ days, hours, minutes, seconds }) =>
        ` ${formatHours(days, hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
      }
    />
  );
};
