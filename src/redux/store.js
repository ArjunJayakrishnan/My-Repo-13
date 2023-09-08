import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import inputReducer from "./inputSlice";
import modeReducer from "./modeSlice";

const store = configureStore({
	reducer: {
		input: inputReducer,
		filter: filterReducer,
		mode: modeReducer,
	},
});

export default store;
