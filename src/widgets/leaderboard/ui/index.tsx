import { useTranslation } from "react-i18next"

import s from './style.module.scss'
import { LeaderboardItem } from "./components"
import { LoaddedData } from "shared/ui/loaddedData"
import { leadboard } from "../model"
import { useUnit } from "effector-react"
import { Loader } from "shared/ui/loader"
import no_avatar from './assets/no-avatar.jpg'

export const Leaderboard = () => {
    const {t} = useTranslation();
    const [leadboardData] = useUnit([leadboard.$data]);
    
    return(
        <div className={s.leaderboard}>
            <h4 className={s.leaderboard_title}>{t('leaderboard_title')}</h4>
            <LoaddedData loaddedData={leadboard.loaddedData} />
            {(leadboardData ?? []).length !== 0 ?
                <div className={s.leaderboard_table}>
                    {leadboardData?.map((user, index) => (
                        <LeaderboardItem
                            key={user?.telegram_id ?? 0}
                            index={user?.index ?? (index + 1)}
                            avatar={user?.avatar ?? no_avatar}
                            full_name={user?.full_name ?? 'Hidden'}
                            username={user?.user_nickname ?? 'Hidden'}
                            points={user?.points ?? 0}
                        />
                    ))}
                </div>
                :
                <Loader className={s.loading} />
            }
        </div>
    )
}