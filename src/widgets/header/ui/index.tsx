import { useToogle } from "shared/lib/toggle";
import hooks from "./assets/hooks.svg";
import fish from "./assets/fish.svg";
import brill from "./assets/brilliant.svg";
import no from "./assets/ind_no.svg";
import ok from "./assets/ind_ok.svg";
import yes from "./assets/ind_yes.svg";
import line from "./assets/prog_line.svg";
import { Menu, InfoModal } from "./components";

import s from "./style.module.scss";
import { useAppSelector } from "hooks/redux";

export const Header = () => {
  const { panelData } = useAppSelector((state) => state.appSlice);
  const [isOpenMenu, onSetStateMenu] = useToogle();
  const [isOpenInfo, onSetStateInfo] = useToogle();
  const { activeTab } = useAppSelector((state) => state.appSlice);

  function getIndValue(key: number): string {
    const indValues: { [key: number]: string } = {
      0: no,
      1: ok,
      2: yes,
    };
    return indValues[key] || no;
  }
  return (
    <header
      className={
        activeTab === "1"
          ? [s.header_wrap, s.header_game].join(" ")
          : s.header_wrap
      }
    >
      <div className={s.header}>
        <div className={s.points}>
          <img width="21px" height="21px" src={hooks} />

          {panelData.bobberValue ?? 0}
        </div>

        <div className={s.points}>
          <img width="26px" height="25px" src={fish} />

          {panelData.fishValue ?? 0}
        </div>

        <div className={s.points}>
          <img width="23px" height="23px" src={brill} />

          {panelData.balance ?? 0}
        </div>

        <div onClick={onSetStateMenu} className={s.menu}>
          <div className={s.menu_item} />
          <div className={s.menu_item} />
          <div className={s.menu_item} />
        </div>
      </div>
      {activeTab === "1" && (
        <>
          <div className={s.progress}>
            <div className={s.line}>
              <img src={line} className={s.line_img} />
            </div>
            <img
              src={getIndValue(panelData.packsCount ?? 0)!}
              className={s.indicator_img}
            />
          </div>
        </>
      )}
      <Menu
        onSetState={onSetStateMenu}
        onSetModal={onSetStateInfo}
        isOpen={isOpenMenu}
      />
      <InfoModal onSetState={onSetStateInfo} isOpen={isOpenInfo} />
    </header>
  );
};
