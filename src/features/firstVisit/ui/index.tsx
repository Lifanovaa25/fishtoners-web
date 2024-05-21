import s from "./style.module.scss";
import title from "shared/assets/title.png";
import { useTranslation } from "react-i18next";
import h1 from "./assets/h1.svg";
import h2 from "./assets/h2.svg";
import h3 from "./assets/h3.svg";
import { useState } from "react";
export const FirstVizit = () => {
  const [close, setClose] = useState(false);
  const { t } = useTranslation();

  function closePage() {
    setClose(!close);

    localStorage.setItem("firstVisit", "1");
    window.location.reload();
  }
  return (
    <div className={close ? s.close : s.hooks}>
      <img src={h1} className={s.hook} />
      <img src={h2} className={s.hook} />
      <img src={h3} className={s.hook} />

      <div className={s.conatiner}>
        <img className={s.title_img} src={title} />

        <div className={s.htp}>{t("How_to_play")}</div>
        <div className={s.rules_container}>
          <div className={s.rules}>
            <div className={s.title}>{t("Purchase bait")}</div>
            <p className={s.text}>
              {t("Select the appropriate bait from the in game store.")}
            </p>
            <p className={s.text}>
              {t(
                "Each lure attracts a specific type of fish and offers different rewards"
              )}
            </p>
          </div>

          <div className={s.rules}>
            <div className={s.title}>{t("Invite Friends")}</div>
            <p className={s.text}>
              {t(
                "Each referred user will bring you 5 hooks, which you can exchange for a reward at the end of the pre-season"
              )}
            </p>
            <p className={s.text}>
              {t(
                "Additionally, for every successful catch made by a user referred by you, you will receive 5% of the net profit"
              )}
            </p>
          </div>

          <div className={s.rules}>
            <div className={s.title}>{t("Earn reward")}</div>
            <p className={s.text}>
              {t(
                "Visit the game daily throughout the pre-game season to receive rewards of the highest quality."
              )}
            </p>
          </div>
        </div>
        <button
          className={s.continue}
          onClick={() => {
            closePage();
          }}
        >
          {t("Continue")}...
        </button>
      </div>
    </div>
  );
};
