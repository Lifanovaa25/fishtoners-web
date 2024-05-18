import { useEffect } from "react";
import i18n from "shared/config/i18n";

import s from "./style.module.scss";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Lang, appSlice } from "store/reducers/appSlice";
import { changeLang } from "store/apis";

export const ChangeLanguage = () => {
  const { lang, initDataRow } = useAppSelector((state) => state.appSlice);
  const { setLanguage } = appSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang ?? "en");
    }
  }, [lang]);

  const changeLanguage = (lng: string) => () => {
    console.log({ lng });
    dispatch(setLanguage(lng as Lang));
    dispatch(changeLang({ language: lng, tma: initDataRow }));
    toast(t("notifications.language"), {
      type: "success",
    });
  };

  return (
    <div className={s.body}>
      <div className={s.language}>
        <button
          className={clsx(s.choose, {
            [s.not_choosed]: lang !== "ru",
          })}
          onClick={changeLanguage("ru")}
        >
          RU
        </button>

        <button
          className={clsx(s.choose, { [s.not_choosed]: lang !== "en" })}
          onClick={changeLanguage("en")}
        >
          ENG
        </button>
      </div>

      <div className={s.language}>
        <button
          className={clsx(s.choose, { [s.not_choosed]: lang !== "ko" })}
          onClick={changeLanguage("ko")}
        >
          KO
        </button>

        <button
          className={clsx(s.choose, {
            [s.not_choosed]: lang !== "ua",
          })}
          onClick={changeLanguage("ua")}
        >
          UA
        </button>
      </div>
    </div>
  );
};
