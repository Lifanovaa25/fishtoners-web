// import { ReferralLink } from 'features/referral-link';
import s from "./style.module.scss";
import { Header } from "widgets/header";

import { CheckIn } from "features/checkIn";
import title from "shared/assets/title.png";
import { Loader } from "shared/ui/loader";
// import { Wallet } from "widgets/wallet/ui";
import { BottomMenu } from "widgets/bottomMenu";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Game } from "features/game";
import { ReferralLink } from "features/referral-link";
import { FirstVizit } from "features/firstVisit";
import { useEffect } from "react";
 import { retrieveLaunchParams } from "@tma.js/sdk";
import { appSlice } from "store/reducers/appSlice";
import {  getUserPanelData } from "store/apis";

const DashBoardPage = () => {
  const { activeTab, /*, initDataRow */ lang} = useAppSelector(
    (state) => state.appSlice
  );
  //const { initDataRaw } = retrieveLaunchParams();
  //console.log(initDataRaw)
  const initDataRaw =
    "query_id=AAHVXm8TAAAAANVebxP8QTqO&user=%7B%22id%22%3A326065877%2C%22first_name%22%3A%22Andrey%22%2C%22last_name%22%3A%22Vladimirovich%22%2C%22username%22%3A%22apashintsev%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1716282891&hash=5e6779d8b94d4ba5958540a84a1ef9b8d1497f0bd24cac7437b65c3172e1552d";
  const { setInitDataRow } = appSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    //console.log({initDataRaw})
    if (initDataRaw) {
      dispatch(setInitDataRow(initDataRaw!));
      dispatch(getUserPanelData({ tma: initDataRaw! }));
    }
  }, [initDataRaw]);

  return (
    <>
      <div className={s.page}>
        {!localStorage.getItem("firstVisit") ? (
          <FirstVizit />
        ) : (
          <>
            {lang ? (
              <>
                <Header />
                {activeTab === "1" && (
                  <>
                    <CheckIn />
                  </>
                )}
                {activeTab === "0" && (
                  <>
                    <Game />
                    {/* <Wallet /> */}
                  </>
                )}

                {activeTab === "3" && (
                  <>
                    <ReferralLink />
                  </>
                )}

                <BottomMenu />
              </>
            ) : (
              <>
                {" "}
                <img src={title} className={s.title} />
                <Loader />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DashBoardPage;
