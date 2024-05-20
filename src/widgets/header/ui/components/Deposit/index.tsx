import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/button";

import Deposit from "../../assets/Deposit.svg";
import s from "./style.module.scss";
import ton from "./../../assets/ton2.svg";

import close from "./../../assets/deposit_close.svg";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { appSlice } from "store/reducers/appSlice";
import { useState } from "react";
import {
  beginCell,
} from "ton-core";
import base64url from "base64url";

interface DepositBtnProps {
  onSetStateDeposit: () => void;
  onSetState: () => void;
  classN?: string;
}

export const DepositBtn = ({
  onSetStateDeposit,
  onSetState,
  classN,
}: DepositBtnProps) => {
  const { t } = useTranslation();

  const openDeposit = () => {
    onSetStateDeposit();
    onSetState();
  };

  return (
    <>
      {classN ? (
        <Button onClick={openDeposit} className={classN ? classN : s.button}>
          <img src={Deposit} />
        </Button>
      ) : (
        <Button
          onClick={openDeposit}
          className={classN ? classN : s.button}
          // isActive
        >
          {t("Deposit")}

          <img src={Deposit} />
        </Button>
      )}
    </>
  );
};

interface DepositModalProps {
  onSetState: () => void;
  isOpen: boolean;
}

export const DepositModal = ({ onSetState, isOpen }: DepositModalProps) => {
  const { activeBtn, refUrl, panelData } = useAppSelector((state) => state.appSlice);
  const { setActiveBtn } = appSlice.actions;
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState("0");
  const [deeplink, setDeepLink] = useState("");

  const tonDeepLink = (address: string, amount: string, body: string) => {
    return `ton://transfer/${address}?amount=${amount}&bin=${body}`;
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(event.target.value);
  };
  const depositHandler = () => {
    let parts = refUrl.split("start=");
    let lastPart = parts[parts.length - 1];
    const body = beginCell()
      .storeUint(3436314585, 32)
      .storeStringRefTail(lastPart)
      .endCell();
    const preparedBodyCell = base64url(body.toBoc())
    const link = tonDeepLink(
      "EQBXnk1YRq4FTmuE2YJO5SqLa51e4Datqtc0mrRu-b_gc1aJ",
      amount,
      preparedBodyCell
    );
    setDeepLink(link);
  };

  return (
    <div className={clsx(s.dep_background, { [s.isopen]: isOpen })}>
      <div className={s.deposit_menu}>
        <div className={s.deposit_header}>
          <button
            className={
              activeBtn === "deposit"
                ? [s.deposit_btn, s.active_btn].join(" ")
                : s.deposit_btn
            }
            onClick={() => {
              dispatch(setActiveBtn("deposit"));
            }}
          >
            Deposit
          </button>
          <button
            className={
              activeBtn === "withdraw"
                ? [s.deposit_btn, s.active_btn].join(" ")
                : s.deposit_btn
            }
            onClick={() => {
              dispatch(setActiveBtn("withdraw"));
            }}
          >
            Withdraw
          </button>
          <div onClick={onSetState} className={s.close}>
            <img src={close} alt="" />
          </div>
        </div>

        <div className={s.deposit_content}>
          <div className={s.balance}>
            Balance:
            <span>{panelData.balance}</span>
            <img src={ton} className={s.ton} />
          </div>
          {activeBtn === "deposit" ? (
            <>
              <div className={s.input_item}>
                <label htmlFor="amount" className={s.inputLabel}>
                  Amount TON:
                </label>
                <input
                  name="amount"
                  className={s.input}
                  type="text"
                  placeholder="0.000000000"
                  readOnly={false}
                  value={amount}
                  onChange={handleChange}
                />
                <div className={s.input_ton}>
                  <img src={ton} className={s.input_img} />
                  TON
                </div>
              </div>
              {deeplink && <a href={deeplink}>Transfer with TON</a>}
              <button className={s.yellow_btn} onClick={depositHandler}>Deposit</button>
            </>
          ) : (
            <>
              <div className={s.input_items}>
                <div className={s.item}>
                  <label htmlFor="amount" className={s.inputLabel}>
                    Amount TON:
                  </label>
                  <input
                    name="amount"
                    className={s.input}
                    type="text"
                    placeholder="0.000000000"
                    readOnly={false}
                  />
                  <div className={s.input_ton}>
                    <img src={ton} className={s.input_img} />
                    TON
                  </div>
                </div>
                <div className={s.item}>
                  <label htmlFor="address" className={s.inputLabel}>
                    To Address:
                  </label>
                  <input
                    name="address"
                    className={s.input}
                    type="text"
                    placeholder=""
                    readOnly={false}
                  />
                </div>

                <div className={s.item}>
                  <label htmlFor="memo" className={s.inputLabel}>
                    Memo:
                  </label>
                  <input
                    name="memo"
                    className={s.input}
                    type="text"
                    placeholder=""
                    readOnly={false}
                  />
                </div>
              </div>
              <button className={s.yellow_btn}>Withdraw</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
