import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cookie: {},
  //  document.cookie.length
  //   ? JSON.parse(document.cookie.split(";").slice(0, 1)[0])
  //   : (document.cookie = "{}"),
};
export const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    editCookie: (state, action) => {
      document.cookie = JSON.stringify({
        adult: action.payload.bool,
      });
      state.cookie = JSON.parse(document.cookie);
    },
  },
});
export const { editCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
