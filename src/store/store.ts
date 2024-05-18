import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./reducers/appSlice";
const rootReducer = combineReducers({
  appSlice,
});
/*
export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware: (arg0: { thunk: boolean; immutableCheck: boolean; serializableCheck: boolean; }) => any) =>
			getDefaultMiddleware({
				thunk: true,
				immutableCheck: false,
				serializableCheck: false,
			}),
	});
};*/
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
