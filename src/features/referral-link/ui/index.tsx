import { useUnit } from "effector-react"
import clsx from 'clsx';

import s from './style.module.scss'
import { useTranslation } from "react-i18next";

import copy from './assets/copy.svg'
import copy_success from './assets/copy_success.svg'
import { link, $isCopied, copyClicked } from "../model";
import { $initDataUnsafe } from "shared/config/telegram";

export const ReferralLink = () => {
    const [isCopied, user, onCopy] = useUnit([$isCopied, $initDataUnsafe, copyClicked]);
    const {t} = useTranslation()
    
    return (
        <div className={s.container}>
            <p className={s.title}>{t('invite_title')}</p>
            <div 
                onClick={onCopy}
                className={s.link} 
            >
                <span className={s.link_text}>{link.replace("https://t.me/", "")}{user?.username ?? ''}</span>

                <img
                    className={clsx({})}
                    src={isCopied ? copy_success : copy}
                />
            </div>
        </div>
    )
}