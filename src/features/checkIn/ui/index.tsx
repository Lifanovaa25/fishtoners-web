import { useAppSelector } from "hooks/redux";
import { Slider } from "./components";
import s from "./style.module.scss";
import { Leaderboard } from "widgets/leaderboard";
import { useTranslation } from "react-i18next";

export const CheckIn = () => {
  const { t } = useTranslation();
  const { leaderboard } = useAppSelector((state) => state.appSlice);

  return (
    <div className={s.conatiner}>
      <>
        <Slider />
        <Leaderboard leaderboard={leaderboard} title={t("leaderboard_title")} />
      </>
    </div>
  );
};
