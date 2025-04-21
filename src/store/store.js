import { configureStore } from "@reduxjs/toolkit";
import cookieSlice from "./cookieSlice/cookieSlice";
import basketSlice from "./basketSlice/basketSlice";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore(
  {
    reducer: {
      cookieReducer: cookieSlice,
      basketReducer: basketSlice,
    },
  },
  composeWithDevTools()
);
