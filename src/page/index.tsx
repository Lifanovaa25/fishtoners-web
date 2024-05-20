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
// import { retrieveLaunchParams } from "@tma.js/sdk";
import { appSlice } from "store/reducers/appSlice";
import {  getUserPanelData } from "store/apis";

const DashBoardPage = () => {
  const { activeTab, /*, initDataRow */ lang} = useAppSelector(
    (state) => state.appSlice
  );
  //const { initDataRaw } = retrieveLaunchParams();
  const initDataRaw = "test"
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
