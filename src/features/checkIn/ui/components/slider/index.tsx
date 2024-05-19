import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { PrevButton, NextButton, usePrevNextButtons } from "./arrow-buttons";
import useEmblaCarousel from "embla-carousel-react";

import s from "./style.module.scss";

import { fishes } from "../../assets/fishes";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { CURRENT_UNIXTIME, DAY_UNIXTIME } from "shared/config";
import { Button } from "shared/ui/button";
import { GmClaim } from "../Gm-claim";
import { useAppSelector } from "hooks/redux";

const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };
const SLIDE_COUNT = 14;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export const Slider: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const { t } = useTranslation();
  const { allfishes, nextFishDate, userFishesCount, isTodayFishClaimed } =
    useAppSelector((state) => state.appSlice);
  const last_claim = nextFishDate ?? 0;
  console.log({ last_claim });
  console.log({ allfishes });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  console.log({ userFishesCount });
  console.log({ isTodayFishClaimed });

  const canClaim = (index: number) => {
    //может забрать рыбку если сегодня ещё не забирал и если индекс (с 0) этой рыбки соответствует количеству рыб у него
    return !isTodayFishClaimed && index == userFishesCount;
  };

  return (
    <section className={s.slider}>
      <div className={s.embla__viewport} ref={emblaRef}>
        <div className={s.embla__container}>
          {SLIDES.map((index) => (
            <div
              className={clsx(s.embla__slide, "shadow", {
                [s.slide_disable]: canClaim(index),
              })}
              key={index}
            >
              {(canClaim(index) ||
                allfishes.find((x) => x.id! - 1 == index)?.claimed!) && (
                <img className={s.slide_fishes} src={fishes[index]} alt="" />
              )}
              {index + " " + canClaim(index)}
              {/*!allfishes.find((x) => x.id! - 1 == index)?.claimed && (
                <Button className={s.collect_btn} isActive>
                  {t("Collect")}
                </Button>
              )*/}
              <div className={s.position}>
                <GmClaim
                  fishNumber={index}
                  canClaim={canClaim(index)}
                  isClaimed={
                    allfishes.find((x) => x.id! - 1 == index)?.claimed!
                  }
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
