import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/button";

import Deposit from "../../assets/Deposit.svg";
import s from "./style.module.scss";
import ton from "./../../assets/ton2.svg";

import close from "./../../assets/deposit_close.svg";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { appSlice } from "store/reducers/appSlice";
import { useEffect, useState } from "react";
import { beginCell } from "ton-core";
import base64url from "base64url";
import { withdraw } from "store/apis";
import { toast } from "react-toastify";

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
  const { activeBtn, refUrl, panelData, initDataRow, status, error } = useAppSelector(
    (state) => state.appSlice
  );
  const { setActiveBtn } = appSlice.actions;
  const dispatch = useAppDispatch();

  const [amountDeposit, setAmountDeposit] = useState("0");
  const [amountWithdraw, setAmountWithdraw] = useState("0");
  const [address, setAddress] = useState("0");
  const [deeplink, setDeepLink] = useState("");

  const tonDeepLink = (address: string, amount: string, body: string) => {
    return `ton://transfer/${address}?amount=${amount}&bin=${body}`;
  };

  const depositHandler = () => {
    let parts = refUrl.split("start=");
    let lastPart = parts[parts.length - 1];
    const body = beginCell()
      .storeUint(3436314585, 32)
      .storeStringRefTail(lastPart)
      .endCell();
    const preparedBodyCell = base64url(body.toBoc());
    const link = tonDeepLink(
      "EQBXnk1YRq4FTmuE2YJO5SqLa51e4Datqtc0mrRu-b_gc1aJ",
      amountDeposit,
      preparedBodyCell
    );
    setDeepLink(link);
  };

  const withdrawHandler = () => {
    dispatch(
      withdraw({ tma: initDataRow, address: address, amount: +amountWithdraw })
    );
  };

  useEffect(() => {
    if (status == "succeeded") {
      toast.success("Deposit request created");
    }
    if (status === "failed") {
      toast.error(error);
    }
  }, [status]);

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
                  value={amountDeposit}
                  onChange={(event) => setAmountDeposit(event.target.value)}
                />
                <div className={s.input_ton}>
                  <img src={ton} className={s.input_img} />
                  TON
                </div>
              </div>
              {deeplink && <a href={deeplink}>Transfer with TON</a>}
              <button className={s.yellow_btn} onClick={depositHandler}>
                Deposit
              </button>
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
                    value={amountWithdraw}
                    onChange={(event) => setAmountWithdraw(event.target.value)}
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
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>

                {/*<div className={s.item}>
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
          </div>*/}
              </div>
              <button className={s.yellow_btn} onClick={withdrawHandler}>
                Withdraw
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
