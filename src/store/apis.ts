import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Client,
  FishesVmResultType,
  PanelDataVmResultType,
  RefDataVmResultType,
  UserVmArrayResultType,
  UsersPacksVmResultType,
} from "./api";
import { createAxiosClient } from "./axiosClient";

interface IAuthorized {
  tma: string;
}

export const getUserPanelData = createAsyncThunk<
  PanelDataVmResultType,
  IAuthorized
>("appSlice/getUserPanelData", async (args, { rejectWithValue }) => {
  try {
    const axiosClient = createAxiosClient(args.tma);
    const c = new Client("", axiosClient);
    return c.getUserPanelData();
  } catch (err: any) {
    console.log({err})
    return rejectWithValue(err.response.data);
  }
});

export const getActiveUsersPack = createAsyncThunk<
  UsersPacksVmResultType,
  IAuthorized
>("appSlice/getActiveUsersPack", async (args, { rejectWithValue }) => {
  try {
    const axiosClient = createAxiosClient(args.tma);
    const c = new Client("", axiosClient);
    console.log('test: ' + c.getActiveUsersPacks)
    return c.getActiveUsersPacks();
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

interface ILangRequest {
  language?: string | undefined;
  tma: string;
}

export const changeLang = createAsyncThunk<
  UsersPacksVmResultType,
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

export const claimTodayReward = createAsyncThunk<any, IAuthorized>(
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
