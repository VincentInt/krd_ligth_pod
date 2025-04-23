import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {
    addBasket: (state, action) => {
      state.basket = [...state.basket, ...action.payload];
    },
    deleteBasket: (state, action) => {
      const filteredBasket = state.basket.filter((item) => {
        return (
          item.type !== action.payload.type || item.id !== action.payload.id
        );
      });
      state.basket = filteredBasket;
    },
    editBasket: (state, action) => {
      const indexFind = state.basket.findIndex((itemFind) => {
        return (
          itemFind.type === action.payload.type &&
          itemFind.id === action.payload.id
        );
      });
      state.basket[indexFind].count = action.payload.count;
    },
  },
});
export const { addBasket, deleteBasket, editBasket } = basketSlice.actions;
export default basketSlice.reducer;
