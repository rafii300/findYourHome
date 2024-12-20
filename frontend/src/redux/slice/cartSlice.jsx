import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    product_list: [],
    stored_list: [],
    products: 0,
    items: 0,
    price: 0,
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
      state.stored_list = state.product_list;
      state.products = action.payload.products;
      state.items = action.payload.items;
      state.price = action.payload.price;
      state.pages = action.payload.pages;
      state.loading = false;
      state.success = true;
      state.error = false;
    },

    Update: (state, action) => {
      let items = state.items;
      let price = state.price;
      state.product_list = state.product_list.map((product) => {
        if (product.Id === action.payload.Id) {
          items += action.payload.cartItem.items - product.items;
          price +=
            product.product.price *
            (action.payload.cartItem.items - product.items);
          return { ...product, ...action.payload.cartItem };
        } else return product;
      });
      state.stored_list = state.product_list;
      state.items = items;
      state.price = price;
      state.loading = false;
      state.success = true;
      state.error = false;
    },

    Delete: (state, action) => {
      let items = state.items;
      let price = state.price;
      state.product_list = state.product_list.filter((product) => {
        if (product.Id === action.payload) {
          items -= product.items;
          price -= product.items * product.product.price;
          return false;
        } else return true;
      });
      state.products = state.products - 1;
      state.stored_list = state.product_list;
      state.items = items;
      state.price = price;
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

export const {
  Initial,
  Loading,
  Success,
  ListProducts,
  Update,
  Delete,
  Error,
} = cartSlice.actions;

export default cartSlice.reducer;
