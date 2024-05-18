import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Client,
  FishesVmResultType,
  LangDto,
  PanelDataVmResultType,
  RefDataVmResultType,
  UserVmArrayResultType,
  UsersPacksVmResultType,
} from "./api";
import { axiosClient } from "./axiosClient";

export const getUserPanelData = createAsyncThunk<PanelDataVmResultType>(
  "appSlice/getUserPanelData",
  async (args, { rejectWithValue }) => {
    try {
      const c = new Client("", axiosClient);
      return c.getUserPanelData();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getActiveUsersPack = createAsyncThunk<UsersPacksVmResultType>(
  "appSlice/getActiveUsersPack",
  async (args, { rejectWithValue }) => {
    try {
      const c = new Client("", axiosClient);
      return c.getActiveUsersPacks();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const changeLang = createAsyncThunk<UsersPacksVmResultType, LangDto>(
  "appSlice/changeLang",
  async (args, { rejectWithValue }) => {
    try {
      const c = new Client("", axiosClient);
      return c.changeLanguage(args);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const claimTodayReward = createAsyncThunk(
  "appSlice/claimTodayReward",
  async (args, { rejectWithValue }) => {
    try {
      const c = new Client("", axiosClient);
      return c.claimTodayReward();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRefData = createAsyncThunk<RefDataVmResultType>(
  "appSlice/getRefData",
  async (args, { rejectWithValue }) => {
    try {
      const c = new Client("", axiosClient);
      return c.getRefData();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getUserFishes = createAsyncThunk<FishesVmResultType>(
  "appSlice/getUserFishes",
  async (args, { rejectWithValue }) => {
    try {
      const c = new Client("", axiosClient);
      return c.getUserFishes();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getLeaderboard = createAsyncThunk<UserVmArrayResultType>(
  "appSlice/getLeaderboard",
  async (args, { rejectWithValue }) => {
    try {
      const c = new Client("", axiosClient);
      return c.getLeaderboard();
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);