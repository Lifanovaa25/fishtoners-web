import s from "./style.module.scss";
import { LeaderboardItem } from "./components";
import { Loader } from "shared/ui/loader";
import no_avatar from "./assets/no-avatar.jpg";
import { FC } from "react";
import { UserVm } from "store/api";

interface IProps {
	leaderboard:UserVm[],
    title:string
}

export const Leaderboard: FC<IProps> = ({ leaderboard, title}) => {
  return (
    <div className={s.leaderboard}>
      <h4 className={s.leaderboard_title}>{title}</h4>
      {/*<LoaddedData loaddedData={leadboard.loaddedData} />*/}
      {leaderboard.length > 0 ? (
        <div className={s.leaderboard_table}>
          {leaderboard?.map((user, index) => (
            <LeaderboardItem
              key={index}
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
