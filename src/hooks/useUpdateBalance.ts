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
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://a26930-7253.x.d-f.pw/balance", {
        withCredentials: false,
        skipNegotiation: true,
        transport: SignalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => initDataRow!,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => console.log("Connected"))
      .catch((err) => console.log("Connection failed: ", err));
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("PaymentConfirmed", (balance) => {
            console.log({ balance });
            dispatch(setBalance(balance));
            toast.success("Баланс пополнен успешно!");
          });
        })
        .catch((e: any) => console.log("Connection failed: ", e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);
};
