import clsx from "clsx";
import Countdown from "react-countdown";

import s from "./style.module.scss";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { claimTodayReward, getUserFishes } from "store/apis";
import { FC } from "react";

interface IProps {
  fishNumber: number;
  canClaim: boolean;
  isClaimed: boolean;
}

export const GmClaim: FC<IProps> = ({ fishNumber, canClaim, isClaimed }) => {
  const { t } = useTranslation();
  const { initDataRow, nextFishDate, userFishesCount } = useAppSelector(
    (state) => state.appSlice
  );

  const dispatch = useAppDispatch();
  const diff = nextFishDate.getTime() - new Date(Date.now()).getTime();
  //const add = fishNumber - userFishesCount;

  const onClaim = () => {
    if (canClaim) {
      dispatch(claimTodayReward({ tma: initDataRow }));
      toast(t("notifications.claim"), {
        type: "success",
      });
    }
  };

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);
  const formatHours = (days: number, hours: number) =>
    formatTime(days * 24 + hours);
  const Completionist = () => {
    dispatch(getUserFishes({ tma: initDataRow! }));
    return <span>reload page</span>;
  };
  const TimerClaim = ({ remained }: { remained: number }) => {
    return (
      <Countdown
        date={Date.now() + remained + 1000}
        renderer={renderer}
      ></Countdown>
    );
  };
  //@ts-ignore
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return ` ${formatHours(days, hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }
  };

  return (
    <>
      <button
        onClick={onClaim}
        className={clsx(s.collect_btn, { [s.gm_disable]: !canClaim })}
      >
        <span className={clsx(s.text, "shadow")}>
          {isClaimed && (
            <span className={s.disable_text}>
              Next check in
              <div className={s.timer}>
                <TimerClaim remained={diff/* + add*/} />
              </div>
            </span>
          )}
          {(canClaim || !isClaimed) && t("Collect")}
        </span>
      </button>
    </>
  );
};
