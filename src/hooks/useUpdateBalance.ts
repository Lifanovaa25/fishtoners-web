import { useEffect, useState } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import * as SignalR from "@aspnet/signalr";
import { useAppDispatch, useAppSelector } from "./redux";
import { toast } from "react-toastify";
import { appSlice } from "store/reducers/appSlice";

export const useUpdateBalance = () => {
  const { setBalance } = appSlice.actions;
  const { initDataRow } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  const [connection, setConnection] = useState<HubConnection>();

  useEffect(() => {
    if (initDataRow) {
      const newConnection = new HubConnectionBuilder()
        .withUrl("https://bhjkoihtfge89y23tghio.xyz/balance", {
          withCredentials: false,
          skipNegotiation: true,
          transport: SignalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => initDataRow!,
        })
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    }
  }, [initDataRow]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on(
            "PaymentConfirmed",
            (balance: number, userId: number) => {
              console.log({ balance });
              console.log({ userId });
              dispatch(setBalance(balance));
              toast.success("Баланс пополнен успешно!");
            }
          );
        })
        .catch((e: any) => console.log("Connection failed: ", e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);
};
