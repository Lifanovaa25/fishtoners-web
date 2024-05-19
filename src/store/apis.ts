import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ApiResponse,
  Client,
  FishesVm,
  PackVm,
  PanelDataVm,
  RefDataVm,
  ResultType,
  UserVm,
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

export const claimTodayReward = createAsyncThunk<ApiResponse<number>, IAuthorized>(
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

export const getRefData = createAsyncThunk<ApiResponse<RefDataVm>, IAuthorized>(
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
export const getUserFishes = createAsyncThunk<ApiResponse<FishesVm>, IAuthorized>(
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
export const getLeaderboard = createAsyncThunk<ApiResponse<UserVm[]>, IAuthorized>(
  "appSlice/getLeaderboard",
  async (args, { rejectWithValue }) => {
    try {
      const axiosClient = createAxiosClient(args.tma);
      const c = new Client("", axiosClient);
      return c.getLeaderboard();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPacks = createAsyncThunk<ApiResponse<PackVm[]>, IAuthorized>(
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