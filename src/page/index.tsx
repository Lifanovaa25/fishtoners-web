import s from "./style.module.scss";
import { Header } from "widgets/header";

import { CheckIn } from "features/checkIn";
import title from "shared/assets/title.png";
import { Loader } from "shared/ui/loader";
import { BottomMenu } from "widgets/bottomMenu";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Game } from "features/game";
import { ReferralLink } from "features/referral-link";
import { FirstVizit } from "features/firstVisit";
import { useEffect, useState } from "react";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { appSlice } from "store/reducers/appSlice";
import {
  getActiveUsersPack,
  getLeaderboard,
  getUserFishes,
  getUserPanelData,
} from "store/apis";
import { useUpdateBalance } from "hooks/useUpdateBalance";

const DashBoardPage = () => {
  const { activeTab, lang } = useAppSelector((state) => state.appSlice);
  const { initDataRaw } = retrieveLaunchParams();

  const { setInitDataRow } = appSlice.actions;
  const dispatch = useAppDispatch();
  useUpdateBalance();

  useEffect(() => {
    if (initDataRaw) {
      dispatch(setInitDataRow(initDataRaw!));
      dispatch(getUserPanelData({ tma: initDataRaw! }));
      dispatch(getLeaderboard({ tma: initDataRaw! }));
      dispatch(getUserFishes({ tma: initDataRaw! }));
      dispatch(getActiveUsersPack({ tma: initDataRaw! }));
    }
  }, [initDataRaw]);

  const [isLoading, setLoading] = useState(true);

  const onLoadEffect = () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  useEffect(onLoadEffect, []);
  return (
    <>
      <div className={s.page}>
        {isLoading ? (
          <>
            <img src={title} className={s.title} />
            <Loader />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default DashBoardPage;
