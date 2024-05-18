import { useUnit } from "effector-react"

import s from './style.module.scss'
import { useTranslation } from "react-i18next";

import { $isCopied, copyClicked } from "../model";
import { $initDataUnsafe } from "shared/config/telegram";

import invite_icon from './assets/invite_icon.svg'

export const ReferralLink = () => {
    const [isCopied, user, onCopy] = useUnit([$isCopied, $initDataUnsafe, copyClicked]);
    const { t } = useTranslation()

    return (
        <div className={s.container}>
            <p className={s.title}>{t('invite_title')}</p>
            <div
                onClick={onCopy}
                className={s.link}
            >
                <span className={isCopied ? [s.active,s.link_text].join(' '):s.link_text}>{t('Copy_invite_Link')}</span>
               
            </div>
            <div className={s.invited}>{t('You_invited')} : 20 <img src={invite_icon} alt="" /></div>
        </div>
    )
}