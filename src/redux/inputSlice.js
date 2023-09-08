import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	country: "",
};
const inputSlice = createSlice({
	name: "input",
	initialState,
	reducers: {
		search(state, action) {
			state.country = action.payload;
		},
	},
});

export default inputSlice.reducer;

export const { search } = inputSlice.actions;
