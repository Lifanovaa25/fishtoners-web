import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FishesVm, FishesVmResultType, PanelDataVmResultType, RefDataVmResultType, UsersPacksVmResultType, UserVmArrayResultType } from "store/api";
import { getActiveUsersPack, getLeaderboard, getRefData, getUserFishes, getUserPanelData } from "store/apis";

export type Lang = "en" | "ru" | "ko" | "ua";

export const initialState = {
  initDataUnsafe: {} as any,
  panelData: {} as PanelDataVmResultType,
  userPacks: {} as UsersPacksVmResultType,
  refData: {} as RefDataVmResultType,
  allfishes:{} as FishesVm,
  leaderboard:{} as UserVmArrayResultType,
  activeTab: "0",
  lang: "en",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setInitDataUnsafe(state, action: PayloadAction<any>) {
      state.initDataUnsafe = action.payload;
    },
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    setLanguage(state, action: PayloadAction<Lang>) {
      state.lang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserPanelData.fulfilled,
        (state, action: PayloadAction<PanelDataVmResultType>) => {
          state.panelData = action.payload;
        }
      )
      .addCase(
        getActiveUsersPack.fulfilled,
        (state, action: PayloadAction<UsersPacksVmResultType>) => {
          state.userPacks = action.payload;
        }
      )
      .addCase(
        getRefData.fulfilled,
        (state, action: PayloadAction<RefDataVmResultType>) => {
          state.refData = action.payload;
        }
      )
      .addCase(
        getUserFishes.fulfilled,
        (state, action: PayloadAction<FishesVmResultType>) => {
          state.allfishes = action.payload.value!;
        }
      )
      .addCase(
        getLeaderboard.fulfilled,
        (state, action: PayloadAction<UserVmArrayResultType>) => {
          state.leaderboard = action.payload;
        }
      );

  },
});

export default appSlice.reducer;
