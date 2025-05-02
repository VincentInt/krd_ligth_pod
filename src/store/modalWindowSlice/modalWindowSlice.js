import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalWindow: false,
};

export const modalWindowSlice = createSlice({
  name: "modalWindow",
  initialState,
  reducers: {
    editViewModalWindow: (state, action) => {
      state.modalWindow = action.payload;
    },
  },
});
export const { editViewModalWindow } = modalWindowSlice.actions;
export default modalWindowSlice.reducer;
