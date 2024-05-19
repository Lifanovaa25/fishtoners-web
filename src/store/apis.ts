import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ApiResponse,
    ClaimRewardResultType,
  Client,
  FishesVmResultType,
  PackVmArrayResultType,
  PanelDataVm,
  RefDataVmResultType,
  ResultType,
  UserVmArrayResultType,
  UsersPacksVm,
} from "./api";
import { createAxiosClient } from "./axiosClient";

interface IAuthorized {
  tma: string;
}

export const getUserPanelData = createAsyncThunk<
  ApiResponse<PanelDataVm>,
  IAuthorized
>("appSlice/getUserPanelData", async (args, { rejectWithValue }) => {
  try {
    const axiosClient = createAxiosClient(args.tma);
    const c = new Client("", axiosClient);
    return c.getUserPanelData();
  } catch (err: any) {
    console.log({ err });
    return rejectWithValue(err.response.data);
  }
});

export const getActiveUsersPack =
  createAsyncThunk <
  ApiResponse<UsersPacksVm>, IAuthorized>(
    "appSlice/getActiveUsersPack",
    async (args, { rejectWithValue }) => {
      try {
        const axiosClient = createAxiosClient(args.tma);
        const c = new Client("", axiosClient);
        return c.getActiveUsersPacks();
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );

interface ILangRequest {
  language?: string | undefined;
  tma: string;
}

export const changeLang = createAsyncThunk<
  ResultType,
  ILangRequest
>("appSlice/changeLang", async (args, { rejectWithValue }) => {
  try {
    const axiosClient = createAxiosClient(args.tma);
    const c = new Client("", axiosClient);
    return c.changeLanguage(args);
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const claimTodayReward = createAsyncThunk<ClaimRewardResultType, IAuthorized>(
  "appSlice/claimTodayReward",
  async (args, { rejectWithValue }) => {
    try {
      const axiosClient = createAxiosClient(args.tma);
      const c = new Client("", axiosClient);
      return c.claimTodayReward();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRefData = createAsyncThunk<RefDataVmResultType, IAuthorized>(
  "appSlice/getRefData",
  async (args, { rejectWithValue }) => {
    try {
      const axiosClient = createAxiosClient(args.tma);
      const c = new Client("", axiosClient);
      return c.getRefData();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getUserFishes = createAsyncThunk<FishesVmResultType, IAuthorized>(
  "appSlice/getUserFishes",
  async (args, { rejectWithValue }) => {
    try {
      const axiosClient = createAxiosClient(args.tma);
      const c = new Client("", axiosClient);
      return c.getUserFishes();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getLeaderboard = createAsyncThunk<
  UserVmArrayResultType,
  IAuthorized
>("appSlice/getLeaderboard", async (args, { rejectWithValue }) => {
  try {
    const axiosClient = createAxiosClient(args.tma);
    const c = new Client("", axiosClient);
    return c.getLeaderboard();
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const getPacks = createAsyncThunk<PackVmArrayResultType, IAuthorized>(
  "appSlice/getPacks",
  async (args, { rejectWithValue }) => {
    try {
      const axiosClient = createAxiosClient(args.tma);
      const c = new Client("", axiosClient);
      return c.getPacks();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

interface IBuyPack {
  packId: string | undefined;
  tma: string;
}

export const buyPack = createAsyncThunk<ApiResponse<string>, IBuyPack>(
  "appSlice/buyPack",
  async (args, { rejectWithValue }) => {
    try {
      const axiosClient = createAxiosClient(args.tma);
      const c = new Client("", axiosClient);
      return c.buyPack({packId:args.packId});
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);