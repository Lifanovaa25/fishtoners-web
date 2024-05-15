import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {

	activeTab: '0',
};

export const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		
		setActiveTab(state, action: PayloadAction<string>) {
			state.activeTab = action.payload;
		},
	},

});

export default appSlice.reducer;
