import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FishesVm, FishesVmResultType, PanelDataVm, PanelDataVmResultType, RefDataVmResultType, UsersPacksVmResultType, UserVmArrayResultType } from "store/api";
import { getActiveUsersPack, getLeaderboard, getRefData, getUserFishes, getUserPanelData } from "store/apis";

export type Lang = "en" | "ru" | "ko" | "ua";

export const initialState = {
  initDataRow: "",
  panelData: {} as PanelDataVm,
  userPacks: {} as UsersPacksVmResultType,
  refData: {} as RefDataVmResultType,
  allfishes:{} as FishesVm,
  leaderboard:{} as UserVmArrayResultType,
  activeTab: "0",
	activeBtn:'deposit',
  lang: "en",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setInitDataRow(state, action: PayloadAction<string>) {
      state.initDataRow = action.payload;
    },
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    setActiveBtn(state, action: PayloadAction<string>) {
			state.activeBtn = action.payload;
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
          state.panelData = action.payload.value!;
          console.log("action.payload");
        }
      )
      .addCase(
        getUserPanelData.rejected,
        (state, action: any) => {
         // state.panelData = action.payload.value!;
          console.log({action});
          console.log({state});
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
