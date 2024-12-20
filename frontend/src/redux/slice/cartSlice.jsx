import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    product_list: [],
    pages: 0,
    loading: false,
    success: false,
    error: false,
  },
  reducers: {
    Initial: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
    },

    Loading: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },

    Success: (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    },

    ListProducts: (state, action) => {
      state.product_list = action.payload.cart;
      state.pages = action.payload.pages;
      state.loading = false;
      state.success = true;
      state.error = false;
    },

    Delete: (state, action) => {
      state.product_list = state.product_list.filter((product) => {
        if (product.Id === action.payload) return false;
        else return true;
      });
      state.loading = false;
      state.success = true;
      state.error = false;
    },

    Error: (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
  },
});

export const { Initial, Loading, Success, ListProducts, Delete, Error } =
  cartSlice.actions;

export default cartSlice.reducer;
