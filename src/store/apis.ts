import { createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "./apiClient";
import {
  ApiException,
  ApiResponse,
  ResultType,
  createAxiosClient,
} from "./axiosClient";

interface IAuthorized {
  tma: string;
}

const createThunkWithClient = <Returned, ThunkArg>(
  typePrefix: string,
  apiCall: (client: Client, args: ThunkArg) => Promise<Returned>
) =>
  createAsyncThunk<Returned, ThunkArg>(
    typePrefix,
    async (args, { rejectWithValue }) => {
      try {
        const axiosClient = createAxiosClient((args as IAuthorized).tma);
        const client = new Client("", axiosClient);
        return await apiCall(client, args);
      } catch (err: any) {
        if (ApiException.isApiException(err)) {
          return rejectWithValue(err.result);
        }
        return rejectWithValue(err.message);
      }
    }
  );

export const getUserPanelData = createThunkWithClient(
  "appSlice/getUserPanelData",
  (client) => client.getUserPanelData()
);

export const getActiveUsersPack = createThunkWithClient(
  "appSlice/getActiveUsersPack",
  (client) => client.getActiveUsersPacks()
);

interface ILangRequest extends IAuthorized {
  language?: string;
}

export const changeLang = createThunkWithClient<ResultType, ILangRequest>(
  "appSlice/changeLang",
  (client, args) => client.changeLanguage(args)
);

export const claimTodayReward = createThunkWithClient(
  "appSlice/claimTodayReward",
  (client) => client.claimTodayReward()
);

export const getRefData = createThunkWithClient(
  "appSlice/getRefData",
  (client) => client.getRefData()
);

export const getUserFishes = createThunkWithClient(
  "appSlice/getUserFishes",
  (client) => client.getUserFishes()
);

export const getLeaderboard = createThunkWithClient(
  "appSlice/getLeaderboard",
  (client) => client.getLeaderboard()
);

export const getPacks = createThunkWithClient("appSlice/getPacks", (client) =>
  client.getPacks()
);

interface IBuyPack extends IAuthorized {
  packId: string;
}

export const buyPack = createThunkWithClient<ApiResponse<string>, IBuyPack>(
  "appSlice/buyPack",
  (client, args) => client.buyPack({ packId: args.packId })
);

interface IWithdraw extends IAuthorized {
  amount: number;
  address: string;
}

export const withdraw = createThunkWithClient<ApiResponse<number>, IWithdraw>(
  "appSlice/withdraw",
  (client, args) =>
    client.withdraw({ amount: args.amount, address: args.address })
);
