import s from "./style.module.scss";
import fh1 from "./assets/fh1.svg";
import fh2 from "./assets/fh2.svg";
import fh3 from "./assets/fh3.svg";
import corn from "./assets/corn.gif";
import bread from "./assets/bread.gif";
import burger from "./assets/burger.gif";
import pizza from "./assets/pizza.gif";
import potato from "./assets/potato.gif";
import worm from "./assets/worm.gif";
import leg from "./assets/leg.gif";
import pepper from "./assets/pepper.gif";
import cookie from "./assets/cookie.gif";
import { useEffect } from "react";
import { getActiveUsersPack } from "store/apis";
import { useAppDispatch, useAppSelector } from "hooks/redux";

export const Game = () => {
  const baitItems: { [key: string]: string } = {
    bread: bread,
    corn: corn,
    worm: worm,
    burger: burger,
    pizza: pizza,
    potato: potato,
    leg: leg,
    peppet: pepper,
    cookie: cookie,
  };
  const getPicture = (name: string) => {
    return baitItems[name];
  };
  const dispatch = useAppDispatch();

  const { userPackNames, initDataRow, packsCount } = useAppSelector(
    (state) => state.appSlice
  );
  useEffect(() => {
    if (initDataRow) {
      dispatch(getActiveUsersPack({ tma: initDataRow! }));
    }
  }, [initDataRow, userPackNames, packsCount]);

  return (
    <div className={s.conatiner}>
      <div className={s.fishhooks}>
        <div className={s.hook_item}>
          <img src={fh1} alt="" className={s.hooks} />
          {userPackNames?.length > 0 && (
            <img
              src={getPicture(userPackNames[0])}
              alt=""
              className={s.hook_bait}
            />
          )}
        </div>

        <div className={s.hook_item}>
          <img src={fh2} alt="" className={s.hooks} />
          {userPackNames?.length > 1 && (
            <img
              src={getPicture(userPackNames[1])}
              alt=""
              className={s.hook_bait}
            />
          )}
        </div>
        <div className={s.hook_item}>
          <img src={fh3} alt="" className={s.hooks} />
          {userPackNames?.length > 2 && (
            <img
              src={getPicture(userPackNames[2])}
              alt=""
              className={s.hook_bait}
            />
          )}
        </div>
      </div>
    </div>
  );
};
