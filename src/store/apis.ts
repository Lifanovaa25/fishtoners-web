import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Client,
  FishesVm,
  PackVm,
  PanelDataVm,
  RefDataVm,
  UserVm,
  UsersPacksVm,
} from "./api";
import {
  ApiException,
  ApiResponse,
  ResultType,
  createAxiosClient,
} from "./axiosClient";

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
    if (ApiException.isApiException(err)) {
      return rejectWithValue(err.result);
    }
    return rejectWithValue(err.message);
  }
});

export const getActiveUsersPack = createAsyncThunk<
  ApiResponse<UsersPacksVm>,
  IAuthorized
>("appSlice/getActiveUsersPack", async (args, { rejectWithValue }) => {
  try {
    const axiosClient = createAxiosClient(args.tma);
    const c = new Client("", axiosClient);
    return c.getActiveUsersPacks();
  } catch (err: any) {
    if (ApiException.isApiException(err)) {
      return rejectWithValue(err.result);
    }
    return rejectWithValue(err.message);
  }
});

interface ILangRequest {
  language?: string | undefined;
  tma: string;
}

export const changeLang = createAsyncThunk<ResultType, ILangRequest>(
  "appSlice/changeLang",
  async (args, { rejectWithValue }) => {
    try {
      const axiosClient = createAxiosClient(args.tma);
      const c = new Client("", axiosClient);
      return c.changeLanguage(args);
    } catch (err: any) {
      if (ApiException.isApiException(err)) {
        return rejectWithValue(err.result);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const claimTodayReward = createAsyncThunk<
  ApiResponse<number>,
  IAuthorized
>("appSlice/claimTodayReward", async (args, { rejectWithValue }) => {
  try {
    const axiosClient = createAxiosClient(args.tma);
    const c = new Client("", axiosClient);
    return c.claimTodayReward();
  } catch (err: any) {
    if (ApiException.isApiException(err)) {
      return rejectWithValue(err.result);
    }
    return rejectWithValue(err.message);
  }
});

export const getRefData = createAsyncThunk<ApiResponse<RefDataVm>, IAuthorized>(
  "appSlice/getRefData",
  async (args, { rejectWithValue }) => {
    try {
      const axiosClient = createAxiosClient(args.tma);
      const c = new Client("", axiosClient);
      return c.getRefData();
    } catch (err: any) {
      if (ApiException.isApiException(err)) {
        return rejectWithValue(err.result);
      }
      return rejectWithValue(err.message);
    }
  }
);
export const getUserFishes = createAsyncThunk<
  ApiResponse<FishesVm>,
  IAuthorized
>("appSlice/getUserFishes", async (args, { rejectWithValue }) => {
  try {
    const axiosClient = createAxiosClient(args.tma);
    const c = new Client("", axiosClient);
    return c.getUserFishes();
  } catch (err: any) {
    if (ApiException.isApiException(err)) {
      return rejectWithValue(err.result);
    }
    return rejectWithValue(err.message);
  }
});
export const getLeaderboard = createAsyncThunk<
  ApiResponse<UserVm[]>,
  IAuthorized
>("appSlice/getLeaderboard", async (args, { rejectWithValue }) => {
  try {
    const axiosClient = createAxiosClient(args.tma);
    const c = new Client("", axiosClient);
    return c.getLeaderboard();
  } catch (err: any) {
    if (ApiException.isApiException(err)) {
      return rejectWithValue(err.result);
    }
    return rejectWithValue(err.message);
  }
});

export const getPacks = createAsyncThunk<ApiResponse<PackVm[]>, IAuthorized>(
  "appSlice/getPacks",
  async (args, { rejectWithValue }) => {
    try {
      const axiosClient = createAxiosClient(args.tma);
      const c = new Client("", axiosClient);
      return c.getPacks();
    } catch (err: any) {
      if (ApiException.isApiException(err)) {
        return rejectWithValue(err.result);
      }
      return rejectWithValue(err.message);
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
      const result = await c.buyPack({ packId: args.packId });
      return result;
    } catch (err: any) {
      if (ApiException.isApiException(err)) {
        return rejectWithValue(err.result);
      }
      return rejectWithValue(err.message);
    }
  }
);
