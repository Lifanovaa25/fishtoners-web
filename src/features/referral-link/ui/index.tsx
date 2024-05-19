import s from "./style.module.scss";
import { useTranslation } from "react-i18next";

import invite_icon from "./assets/invite_icon.svg";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Leaderboard } from "widgets/leaderboard";
import { useEffect } from "react";
import { getRefData } from "store/apis";

export const ReferralLink = () => {
  const { t } = useTranslation();
  const { youInvitedCount, refLeaderboard, initDataRow } = useAppSelector(
    (state) => state.appSlice
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initDataRow) {
      dispatch(getRefData({ tma: initDataRow! }));
    }
  }, [initDataRow]);
  return (
    <>
      <div className={s.container}>
        <p className={s.title}>{t("invite_title")}</p>
        <div
          //onClick={}
          className={s.link}
        >
          <span
            className={true ? [s.active, s.link_text].join(" ") : s.link_text}
          >
            {t("Copy_invite_Link")}
          </span>
        </div>
        <div className={s.invited}>
          {t("You_invited")} : {youInvitedCount}{" "}
          <img src={invite_icon} alt="" />
        </div>
      </div>
      <Leaderboard
        leaderboard={refLeaderboard}
        title={t("leaderboard_title")}
      />
    </>
  );
};
