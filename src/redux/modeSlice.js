import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	theme: "dark",
};
const modeSlice = createSlice({
	name: "mode",
	initialState,
	reducers: {
		change(state, action) {
			state.theme = action.payload;
		},
	},
});

export default modeSlice.reducer;

export const { change } = modeSlice.actions;
