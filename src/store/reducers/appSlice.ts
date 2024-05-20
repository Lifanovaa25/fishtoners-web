import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import {
  FishesVm,
  FishVm,
  PackVm,
  PanelDataVm,
  RefDataVm,
  UsersPacksVm,
  UserVm,
} from "store/apiClient";
import {
  buyPack,
  claimTodayReward,
  getActiveUsersPack,
  getLeaderboard,
  getPacks,
  getRefData,
  getUserFishes,
  getUserPanelData,
  withdraw,
} from "store/apis";
import { ApiError, ApiResponse } from "store/axiosClient";

export type Lang = "en" | "ru" | "ko" | "ua";
export type Status = "idle" | "loading" | "succeeded" | "failed";

export const initialState = {
  initDataRow: "",
  userId:0,
  bobberValue: 0,
  fishValue: 0,
  packsCount: 0,
  balance: 0,
  userPackNames: [] as string[],

  youInvitedCount: 0,
  refUrl: "",
  refLeaderboard: [] as UserVm[],

  nextFishDate: new Date(Date.now()),
  allfishes: [] as FishVm[],
  userFishesCount: 0,
  isTodayFishClaimed: true,

  leaderboard: [] as UserVm[],

  packsForStore: [] as PackVm[],

  activeTab: "0",
  activeBtn: "deposit",
  lang: "",

  status: "idle" as Status,
  error: "",
};

type State = typeof initialState;

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
        (state, action: PayloadAction<ApiResponse<PanelDataVm>>) => {
          state.balance = action.payload.value!.balance!;
          state.bobberValue = action.payload.value!.bobberValue!;
          state.fishValue = action.payload.value!.fishValue!;
          state.packsCount = action.payload.value!.packsCount!;
          state.lang=action.payload.value!.languageCode!
		  state.userId=action.payload.value!.userId
        }
      )
      .addCase(getUserPanelData.rejected, (state, action: any) => {
        // state.panelData = action.payload.value!;
        console.log({ action });
        console.log({ state });
      })
      .addCase(
        getActiveUsersPack.fulfilled,
        (state, action: PayloadAction<ApiResponse<UsersPacksVm>>) => {
          state.userPackNames = action.payload.value!.names!;
        }
      )
      .addCase(
        getRefData.fulfilled,
        (state, action: PayloadAction<ApiResponse<RefDataVm>>) => {
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
        (state, action: PayloadAction<ApiResponse<FishesVm>>) => {
          state.nextFishDate = new Date(action.payload.value!.nextFishDate!);
          state.allfishes = action.payload.value!.fishes!;
          state.userFishesCount = action.payload.value!.userFishesCount!;
          state.isTodayFishClaimed = action.payload.value!.isTodayFishClaimed!;
        }
      )
      .addCase(
        getLeaderboard.fulfilled,
        (state, action: PayloadAction<ApiResponse<UserVm[]>>) => {
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
        (state, action: PayloadAction<ApiResponse<number>>) => {
          state.isTodayFishClaimed = true;
          state.userFishesCount = action.payload.value!;
          state.allfishes.find((x) => x.id == action.payload.value!)!.claimed =
            true;
        }
      )
      .addCase(
        getPacks.fulfilled,
        (state, action: PayloadAction<ApiResponse<PackVm[]>>) => {
          state.packsForStore = action.payload.value!;
        }
      )
      .addCase(buyPack.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        buyPack.fulfilled,
        (state, action: PayloadAction<ApiResponse<string>>) => {
          state.userPackNames?.push(action.payload.value!);
          state.packsForStore.find(
            (x) => x.name!.toLowerCase() == action.payload.value!
          )!.isAvailable = false;
		  state.packsCount = state.userPackNames.length
          state.status = "succeeded";
        }
      )
      .addCase(buyPack.rejected, (state, action) => {
        processError(state, action, "Failed to buy pack");
      })
      .addCase(withdraw.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        withdraw.fulfilled,
        (state, action: PayloadAction<ApiResponse<number>>) => {
          state.balance = action.payload.value!;
          state.status = "succeeded";
        }
      )
      .addCase(withdraw.rejected, (state, action) => {
        processError(state, action, "Failed to create deposit");
      });
  },
});

export default appSlice.reducer;

function processError(state: State, action: any, msg: string) {
  state.status = "failed";
  if (action.payload) {
    const apiError = action.payload as ApiError;
    state.error =
      apiError.errors.length > 0 ? apiError.errors[0].code : apiError.title;
    //toast.error(apiError.errors.map((e) => e.description).join(", "));
  } else {
    state.error = action.error.message || msg;
  }
}
