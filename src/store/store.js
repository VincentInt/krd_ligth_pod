import { configureStore } from "@reduxjs/toolkit";
import cookieSlice from "./cookieSlice/cookieSlice";
import basketSlice from "./basketSlice/basketSlice";
import modalWindowSlice from "./modalWindowSlice/modalWindowSlice";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore(
  {
    reducer: {
      cookieReducer: cookieSlice,
      basketReducer: basketSlice,
      modalWindowReducer: modalWindowSlice,
    },
  },
  composeWithDevTools()
);
