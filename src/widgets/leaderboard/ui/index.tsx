import { useTranslation } from "react-i18next";

import s from "./style.module.scss";
import { LeaderboardItem } from "./components";
import { Loader } from "shared/ui/loader";
import no_avatar from "./assets/no-avatar.jpg";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";
import { appSlice } from "store/reducers/appSlice";
import { getLeaderboard } from "store/apis";

export const Leaderboard = () => {
  const { t } = useTranslation();
  const { leaderboard, initDataRow } = useAppSelector(
    (state) => state.appSlice
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLeaderboard({ tma: initDataRow }));
  }, []);

  return (
    <div className={s.leaderboard}>
      <h4 className={s.leaderboard_title}>{t("leaderboard_title")}</h4>
      {/*<LoaddedData loaddedData={leadboard.loaddedData} />*/}
      {(leaderboard.value ?? []).length !== 0 ? (
        <div className={s.leaderboard_table}>
          {leaderboard.value?.map((user, index) => (
            <LeaderboardItem
              key={user?.name ?? 0}
              index={index + 1}
              avatar={user?.avatarUrl ?? no_avatar}
              full_name={user?.name ?? "Hidden"}
              username={user?.name ?? "Hidden"}
              points={user?.score ?? 0}
            />
          ))}
        </div>
      ) : (
        <Loader className={s.loading} />
      )}
    </div>
  );
};
