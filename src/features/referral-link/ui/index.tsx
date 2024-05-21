import s from "./style.module.scss";
import { useTranslation } from "react-i18next";

import invite_icon from "./assets/invite_icon.svg";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Leaderboard } from "widgets/leaderboard";
import { useEffect, useState } from "react";
import { getRefData } from "store/apis";
import { toast } from "react-toastify";

export const ReferralLink = () => {
  const { t } = useTranslation();
  const { youInvitedCount, refLeaderboard, initDataRow, refUrl } =
    useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    if (initDataRow) {
      dispatch(getRefData({ tma: initDataRow! }));
    }
  }, [initDataRow]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(refUrl);
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 500);
    toast.info(t("ref_link_copied"));
  };
  return (
    <>
      <div className={s.container}>
        <p className={s.title}>{t("invite_title")}</p>
        <div onClick={handleCopyClick} className={s.link}>
          <span className={isBlinking ? s.link_text : s.active}>
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
