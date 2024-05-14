import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './arrow-buttons'
import useEmblaCarousel from 'embla-carousel-react'

import s from './style.module.scss';

import {worms} from '../../assets/worms'
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CURRENT_UNIXTIME, DAY_UNIXTIME } from 'shared/config';
import { useUnit } from 'effector-react';
import { $userProfile } from 'shared/config/user';

const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };
const SLIDE_COUNT = 14;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export const Slider: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const {t} = useTranslation();
  const profile = useUnit($userProfile);
  const last_claim = (profile?.last_claim ?? 0);
  
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className={s.slider}>
      <div className={s.embla__viewport} ref={emblaRef}>
        <div className={s.embla__container} >
          {SLIDES.map((index) => (
            <div
              className={clsx(
                s.embla__slide, "shadow", 
                {
                  [s.slide_disable]: (CURRENT_UNIXTIME > (+__START_APP__ + (index * DAY_UNIXTIME) + DAY_UNIXTIME) ||
                    last_claim > + __START_APP__ + (index * DAY_UNIXTIME)
                  )
                }
                )} 
              key={index}
            >
              <img
                className={s.slide_worm}
                src={worms[index]}
                alt=''
              />

              <p className={s.slide_text}>{t('days')} {index+1}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={s.embla__controls}>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  )
}

