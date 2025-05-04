import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};
const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites = [...state.favorites, ...action.payload];
    },
    editFavorite: (state, action) => {
      state.favorites = state.favorites.filter((item) => {
        return !(
          item.typeProducts === action.payload.typeProducts &&
          item.id === action.payload.id
        );
      });
    },
  },
});

export const { addFavorite, editFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
