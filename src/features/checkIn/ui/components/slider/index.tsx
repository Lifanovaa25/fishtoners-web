import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { PrevButton, NextButton, usePrevNextButtons } from "./arrow-buttons";
import useEmblaCarousel from "embla-carousel-react";

import s from "./style.module.scss";

import { fishes } from "../../assets/fishes";
import clsx from "clsx";
import { GmClaim } from "../Gm-claim";
import { useAppSelector } from "hooks/redux";

const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };
//const SLIDE_COUNT = 14;
//const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export const Slider: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const { allfishes, userFishesCount, isTodayFishClaimed } = useAppSelector(
    (state) => state.appSlice
  );
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const canClaim = (index: number) => {
    //может забрать рыбку если сегодня ещё не забирал и если индекс (с 0) этой рыбки соответствует количеству рыб у него
    return !isTodayFishClaimed && index == userFishesCount;
  };

  return (
    <section className={s.slider}>
      <div className={s.embla__viewport} ref={emblaRef}>
        <div className={s.embla__container}>
          {allfishes
            //.filter((x) => !x.claimed)
            .filter((x) =>
              isTodayFishClaimed
                ? x.id - 1 > userFishesCount
                : x.id > userFishesCount
            )
            .map((fish, index) => (
              <div
                className={clsx(s.embla__slide, "shadow", {
                  [s.slide_disable]: fish.claimed,
                })}
                key={index}
              >
                {!fish.claimed && (
                  <img
                    className={s.slide_fishes}
                    src={fishes[fish.id - 1]}
                    alt=""
                  />
                )}
                <div className={s.position}>
                  <GmClaim
                    canClaim={canClaim(index)}
                    isClaimed={fish.claimed}
                  />
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
  );
};
