import { useToogle } from "shared/lib/toggle";
import hooks from "./assets/hooks.svg";
import fish from "./assets/fish.svg";
import ton from "./assets/ton.svg";
import no from "./assets/ind_no.svg";
import ok from "./assets/ind_ok.svg";
import yes from "./assets/ind_yes.svg";
import line from "./assets/prog_line.svg";
import { Menu, InfoModal, DepositModal } from "./components";

import s from "./style.module.scss";
import { useAppSelector } from "hooks/redux";
import { Wallet } from "widgets/wallet";

export const Header = () => {
  const [isOpenMenu, onSetStateMenu] = useToogle();
  const [isOpenInfo, onSetStateInfo] = useToogle();
  const [isOpenDeposit, onSetStateDeposit] = useToogle();
  const { activeTab, balance,bobberValue,fishValue,packsCount } = useAppSelector((state) => state.appSlice);

  function getIndValue(key: number): string {
    const indValues: { [key: number]: string } = {
      0: no,
      1: ok,
      2: yes,
      3: yes,
    };

    return indValues[key] || no;
  }
  return (
    <>
      <header
        className={
          activeTab === "0"
            ? [s.header_wrap, s.header_game].join(" ")
            : s.header_wrap
        }
      >
        <div className={s.header}>
          <div className={s.points}>
            <img width="21px" height="21px" src={hooks} />

            {bobberValue ?? 0}
          </div>

          <div className={s.points}>
            <img width="26px" height="25px" src={fish} />

            {fishValue ?? 0}
          </div>

          <div className={balance.toString().length >3 ? s.fz20 : s.points }>
            <img width="23px" height="23px" src={ton} />

            {balance ?? 0}
          </div>
          <div onClick={onSetStateMenu} className={s.menu}>
            <div className={s.menu_item} />
            <div className={s.menu_item} />
            <div className={s.menu_item} />
          </div>
        </div>
        {activeTab === "0" && (
          <>
            <div className={s.progress}>
              <div
                style={{ width: `calc( ${packsCount} * 33% )` }}
                className={s.line}
              >
                <img src={line} className={s.line_img} />
              </div>
              <img
                src={getIndValue(packsCount ?? 0)!}
                className={s.indicator_img}
              />
            </div>
          </>
        )}
        <Menu
          onSetState={onSetStateMenu}
          onSetModal={onSetStateInfo}
          onSetStateDeposit={onSetStateDeposit}
          isOpen={isOpenMenu}
        />
        <InfoModal onSetState={onSetStateInfo} isOpen={isOpenInfo} />
        <DepositModal onSetState={onSetStateDeposit} isOpen={isOpenDeposit} />
      </header>
      {activeTab === "0" && (
        <Wallet onSetState={onSetStateDeposit} isOpen={isOpenDeposit} />
      )}
    </>
  );
};
