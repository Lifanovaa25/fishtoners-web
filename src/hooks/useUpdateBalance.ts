import { useEffect, useState } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import * as SignalR from "@aspnet/signalr";
import { /*useAppDispatch,*/ useAppSelector } from "./redux";
import { toast } from "react-toastify";

export const useUpdateBalance = () => {
  //const { setBalance, setIsOpenDepositModal } = paymentsSlice.actions;
  //const { setCanClose } = kycSlice.actions;
  const { initDataRow } = useAppSelector((state) => state.appSlice);
  //const dispatch = useAppDispatch();
  const [connection, setConnection] = useState<HubConnection>();

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(
        `${/*import.meta.env.VITE_APP_BACKEND_URI!*/ "https://94c9-5-61-33-45.ngrok-free.app"}/balance`,
        {
          withCredentials: false,
          skipNegotiation: true,
          transport: SignalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => initDataRow!,
        }
      )
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("PaymentConfirmed", () => {
            //dispatch(setBalance(balanceVm));
            //dispatch(setIsOpenDepositModal(false));
            toast.success("Баланс пополнен успешно!");
          });
          connection.on("UserActivated", () => {
            //dispatch(setCanClose(true));
            toast.success("Ваша учётная запись активирована!");
          });
        })
        .catch((e: any) => console.log("Connection failed: ", e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);
};
