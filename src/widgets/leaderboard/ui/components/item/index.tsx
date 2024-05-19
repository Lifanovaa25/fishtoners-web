import s from './style.module.scss'

import first_place from '../../assets/first-place.svg'
import second_place from '../../assets/second-place.svg'
import third_place from '../../assets/third-place.svg'
import noAvatar from '../../assets/no-avatar.jpg'

interface LeaderboardItemProps {
    index: number,
    avatar: string,
    full_name: string,
    username: string,
    points: number,
}

export const LeaderboardItem = ({
    index, 
    avatar,
    full_name,
    username,
    points
}: LeaderboardItemProps) => (
    <div className={s.leaderboard_item}>
        {index === 1 && <img src={first_place} />}
        {index === 2 && <img src={second_place} />}
        {index === 3 && <img src={third_place} />}
        {index > 3 && 
            <p className={s.item_place}>#{index}</p>
        }

        <div className={s.item_body}>
            <div className={s.item_left}>
                <div className={s.item_avatar}>
                    <img src={avatar? avatar : noAvatar} />
                </div>

                <div className={s.names}>
                    <span className={s.full_name}>{full_name.length > 8 ? full_name.slice(0, 8) + "..." : full_name}</span>
                    <span className={s.username}>{username}</span>
                </div>
            </div>

            <p className={s.points_count}>{points}</p>
        </div>
    </div>
)