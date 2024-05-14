
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { api } from 'shared/api';
import i18n from 'shared/config/i18n';
import { $userProfile } from 'shared/config/user';

import s from './style.module.scss'
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const ChangeLanguage = () => {
    const [profile, onChooseLanguage] = useUnit([$userProfile, api.users.update.choosedLanguage]);
    const {t} = useTranslation()

    useEffect(() => {
        if(profile) {
            i18n.changeLanguage(profile?.language ?? 'eng');
            
        }
    }, [profile])

    const changeLanguage = (lng: string) => () => {
        onChooseLanguage(lng);
        toast(t('notifications.language'), {
            type: 'success'
        })
    }

    return (
        <div className={s.body}>
            <div className={s.language}>
                <button
                    className={clsx(s.choose, {[s. not_choosed]: profile?.language !== 'ru'})}
                    onClick={changeLanguage('ru')} 
                >RU</button>

                <button
                    className={clsx(s.choose, {[s. not_choosed]: profile?.language !== 'eng'})}
                    onClick={changeLanguage('eng')} 
                >ENG</button>
            </div>

            <div className={s.language}>
                <button
                    className={clsx(s.choose, {[s. not_choosed]: profile?.language !== 'ko'})}
                    onClick={changeLanguage('ko')} 
                >KO</button>

                <button
                    className={clsx(s.choose, {[s. not_choosed]: profile?.language !== 'ua'})}
                    onClick={changeLanguage('ua')} 
                >UA</button>
            </div>
        </div>
    )
}