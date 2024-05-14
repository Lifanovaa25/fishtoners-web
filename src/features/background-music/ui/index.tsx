

import play from './img/play.svg'

import { useMusic } from '../model'

import s from './style.module.scss'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/button'

export const BackgroundMusic = () => {
    const {t} = useTranslation();
    const {
        isPlay,
        setPlay,
    } = useMusic();

    return(
        <Button
            onClick={setPlay}
            className={s.button}
            isActive={isPlay}
        >
            <span className={s.text}>{t('sound')}</span>

            <div className={s.sound_bg}>
                <img
                    className={clsx({[s.play_off]: !isPlay})}
                    src={play}  
                />
            </div>
        </Button>
    )
}