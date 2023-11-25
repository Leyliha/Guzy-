import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  address: null,
  name: null,
  phone: null
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload._id);
      if (item) {
        item.qty += action.payload.qty;
      } else {
        state.products.push(action.payload);
      }
    },

    //пока не работает
    addAllToCart: (state, action) => {
      action.payload.map((load) => state.products.push(load));
    },
    removeItem: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);
      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        state.products = state.products.filter(
          (item) => item._id !== action.payload
        );
      }
    },
    resetCart: (state) => {
      state.products = [];
      state.address = null;
      state.name = null;
      state.phone = null;
    },
    setAddress: (state, action) => {
      state.address = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setPhone: (state, action) => {
      state.phone = action.payload
    }
  },
});

export const { addToCart, removeItem, resetCart, addAllToCart, setAddress, setName, setPhone } =
  cartSlice.actions;

export default cartSlice.reducer;