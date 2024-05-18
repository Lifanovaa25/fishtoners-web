import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './arrow-buttons'
import useEmblaCarousel from 'embla-carousel-react'

import s from './style.module.scss';

import { fishes } from '../../assets/fishes'
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CURRENT_UNIXTIME, DAY_UNIXTIME } from 'shared/config';
import { Button } from 'shared/ui/button';
import { GmClaim } from '../Gm-claim';
import { useAppSelector } from 'hooks/redux';

const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };
const SLIDE_COUNT = 14;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export const Slider: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const { t } = useTranslation();
  const { allfishes } = useAppSelector((state) => state.appSlice);
  const last_claim = allfishes.nextFishDate?.getTime() ?? 0;

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
                className={s.slide_fishes}
                // className={s.slide_worm}
                src={fishes[index]}
                alt=''
              />

              {/* <p className={s.slide_text}>{t('days')} {index + 1}</p> */}

              <Button className={s.collect_btn} isActive>{t('Collect')}</Button>
              <div className={s.position}>
                <GmClaim fishNumber={index}/>
              </div>

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
