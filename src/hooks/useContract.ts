import { Address, OpenedContract, toNano } from "ton-core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import {
  FishTonersMain,
  Deposit,
} from "../build/FishTonersMain/tact_FishTonersMain";

export function useContract() {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();

  const contract = useAsyncInitialize(async () => {
    if (!client || !wallet) return;

    const contract = FishTonersMain.fromAddress(
      Address.parse("EQBXnk1YRq4FTmuE2YJO5SqLa51e4Datqtc0mrRu-b_gc1aJ")
    );

    return client.open(contract) as OpenedContract<FishTonersMain>;
  }, [client, wallet]);

  return {
    depositCall: (amount: bigint, user: string) => {
      const message: Deposit = {
        $$type: "Deposit",
        user,
      };

      contract?.send(
        sender,
        {
          value: toNano("0.03") + toNano(amount),
        },
        message
      );
    },
  };
}
