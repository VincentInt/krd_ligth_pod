import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cookie: document.cookie.length
    ? JSON.parse(document.cookie.split(";").slice(0,1)[0])
    : (document.cookie = "{}"),
};
export const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    getCookie: (state) => {
      state.cookie = JSON.parse(document.cookie.split(";").slice(0,1)[0]);
    },
  },
});
export const { getCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
