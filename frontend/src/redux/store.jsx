import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import productReducer from "./slice/productSlice";
import orderReducer from "./slice/orderSlice";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    cart: cartReducer,
  },
});

export default store;
