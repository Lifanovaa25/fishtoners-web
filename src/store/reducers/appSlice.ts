import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ClaimRewardResultType,
  FishesVm,
  FishesVmResultType,
  FishVm,
  PanelDataVm,
  PanelDataVmResultType,
  RefDataVm,
  RefDataVmResultType,
  UsersPacksVmResultType,
  UserVm,
  UserVmArrayResultType,
} from "store/api";
import {
  claimTodayReward,
  getActiveUsersPack,
  getLeaderboard,
  getRefData,
  getUserFishes,
  getUserPanelData,
} from "store/apis";

export type Lang = "en" | "ru" | "ko" | "ua";

export const initialState = {
  initDataRow: "",
  panelData: {} as PanelDataVm,
  userPacks: {} as UsersPacksVmResultType,
  //refData: {} as RefDataVm,
  youInvitedCount: 0,
  refUrl: "",
  refLeaderboard: {} as UserVm[],

  //allfishes: {} as FishesVm,
  nextFishDate: new Date(Date.now()),
  allfishes: [] as FishVm[],
  userFishesCount: 0,
  isTodayFishClaimed: true,

  leaderboard: [] as UserVm[],

  activeTab: "0",
  activeBtn: "deposit",
  lang: "en",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setInitDataRow(state, action: PayloadAction<string>) {
      state.initDataRow = action.payload;
      console.log("row" + action.payload);
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
      .addCase(getUserPanelData.rejected, (state, action: any) => {
        // state.panelData = action.payload.value!;
        console.log({ action });
        console.log({ state });
      })
      .addCase(
        getActiveUsersPack.fulfilled,
        (state, action: PayloadAction<UsersPacksVmResultType>) => {
          state.userPacks = action.payload;
        }
      )
      .addCase(
        getRefData.fulfilled,
        (state, action: PayloadAction<RefDataVmResultType>) => {
          state.youInvitedCount = action.payload.value!.youInvitedCount!;
          state.refUrl = action.payload.value!.refUrl!;
          state.refLeaderboard = action.payload.value!.leadeboard!;
          if (state.refLeaderboard.length < 10) {
            for (let index = state.refLeaderboard.length; index < 10; index++) {
              const empty: UserVm = { name: "Unknown" };
              state.refLeaderboard.push(empty);
            }
          }
        }
      )
      .addCase(
        getUserFishes.fulfilled,
        (state, action: PayloadAction<FishesVmResultType>) => {
          state.nextFishDate = new Date(action.payload.value!.nextFishDate!);
          state.allfishes = action.payload.value!.fishes!;
          state.userFishesCount = action.payload.value!.userFishesCount!;
          state.isTodayFishClaimed = action.payload.value!.isTodayFishClaimed!;
        }
      )
      .addCase(
        getLeaderboard.fulfilled,
        (state, action: PayloadAction<UserVmArrayResultType>) => {
          state.leaderboard = action.payload.value!;
          if (state.leaderboard.length < 10) {
            for (let index = state.leaderboard.length; index < 10; index++) {
              const empty: UserVm = { name: "Unknown" };
              state.leaderboard.push(empty);
            }
          }
        }
      )
      .addCase(
        claimTodayReward.fulfilled,
        (state, action: PayloadAction<ClaimRewardResultType>) => {
          state.isTodayFishClaimed = true;
          state.userFishesCount = action.payload.value!;
          state.allfishes.find((x) => x.id == action.payload.value!)!.claimed =
            true;
        }
      );
  },
});

export default appSlice.reducer;
