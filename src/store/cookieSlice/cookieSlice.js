import { createSlice } from "@reduxjs/toolkit";

function getCookie() {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`userCookie=`))
    ?.split("=")[1];
  return value
    ? JSON.parse(decodeURIComponent(value))
    : { adult: false, basket: [], favorites: [] };
}
const initialState = {
  cookie: getCookie(),
};
export const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    editCookie: (state, action) => {
      const cookie = { ...state.cookie, ...action.payload };

      document.cookie = `userCookie=${encodeURIComponent(
        JSON.stringify(cookie)
      )}; path=/; max-age=86000`;

      state.cookie = getCookie();
    },
  },
});
export const { editCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
