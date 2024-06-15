import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authenticationSlice.js";

const store = configureStore({
    reducer: {
        auth: authenticationSlice,
    }
});

export default store;
