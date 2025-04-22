import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cookie: JSON.parse(document.cookie.split(";")[0]),
};
export const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    editCookie: (state, action) => {
      document.cookie = JSON.stringify({
        adult: action.payload.bool,
      });
      state.cookie = document.cookie;
    },
  },
});
export const { editCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
