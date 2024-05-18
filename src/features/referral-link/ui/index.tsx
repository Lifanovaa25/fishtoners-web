
import s from './style.module.scss'
import { useTranslation } from "react-i18next";


import invite_icon from './assets/invite_icon.svg'

export const ReferralLink = () => {
    const { t } = useTranslation()
    return (
        <div className={s.container}>
            <p className={s.title}>{t('invite_title')}</p>
            <div
                //onClick={}
                className={s.link}
            >
                <span className={true ? [s.active,s.link_text].join(' '):s.link_text}>{t('Copy_invite_Link')}</span>
               
            </div>
            <div className={s.invited}>{t('You_invited')} : 20 <img src={invite_icon} alt="" /></div>
        </div>
    )
}