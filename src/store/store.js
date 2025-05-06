import { configureStore } from "@reduxjs/toolkit";
import cookieSlice from "./cookieSlice/cookieSlice";
import basketSlice from "./basketSlice/basketSlice";
import modalWindowSlice from "./modalWindowSlice/modalWindowSlice";
import favoriteSlice from "./favoriteSlice/favoriteSlice";
import scrollStateSlice from "./scrollStateSlice/scrollStateSlice";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore(
  {
    reducer: {
      cookieReducer: cookieSlice,
      basketReducer: basketSlice,
      modalWindowReducer: modalWindowSlice,
      favoriteReducer: favoriteSlice,
      scrollStateReducer: scrollStateSlice,
    },
  },
  composeWithDevTools()
);
