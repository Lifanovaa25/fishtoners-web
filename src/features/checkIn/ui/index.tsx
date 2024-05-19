import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Slider } from "./components";
import s from "./style.module.scss";
import { Leaderboard } from "widgets/leaderboard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getLeaderboard, getRefData, getUserFishes } from "store/apis";

export const CheckIn = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { leaderboard, initDataRow } = useAppSelector(
    (state) => state.appSlice
  );
  useEffect(() => {
    if (initDataRow) {
      dispatch(getLeaderboard({ tma: initDataRow! }));
      dispatch(getUserFishes({ tma: initDataRow! }));
    }
  }, [initDataRow]);
  return (
    <div className={s.conatiner}>
      <>
        <Slider />
        <Leaderboard leaderboard={leaderboard} title={t("leaderboard_title")} />
      </>
    </div>
  );
};
