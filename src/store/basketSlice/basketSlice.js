import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [{ type: "podSystems", id: 22, count: 1 }],
};

const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {
    addBasket: (state, action) => {
      state.basket.push(action.payload);
    },
    deleteBasket: (state, action) => {
      state.basket = state.basket.filter((item) => {
        return (
          item.type !== action.payload.type && item.id !== action.payload.id
        );
      });
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
