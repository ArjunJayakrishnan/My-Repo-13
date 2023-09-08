import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	region: "",
};
const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		select(state, action) {
			state.region = action.payload;
		},
	},
});

export default filterSlice.reducer;

export const { select } = filterSlice.actions;
