import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: true,
  modalWindows: true,
  filterDrop: true,
};

export const scrollStateSlice = createSlice({
  name: "scrollState",
  initialState,
  reducers: {
    editScrollState: (state, action) => {
      state[Object.keys(action.payload)[0]] =
        action.payload[Object.keys(action.payload)[0]];

      for (const key in state) {
        if (state[key]) {
          document.documentElement.style.overflowY = "scroll";
          document.documentElement.style.overflowX = "auto";
        } else {
          document.documentElement.style.overflowY = "hidden";
          document.documentElement.style.overflowX = "hidden";
          break;
        }
      }
    },
  },
});
export const { editScrollState } = scrollStateSlice.actions;
export default scrollStateSlice.reducer;
