import {
  Loading,
  Success,
  ListProducts,
  Delete,
  Error,
} from "../slice/cartSlice";
import axios from "axios";

export const addToCart = (cartItem) => async (dispatch) => {
  const url = "http://127.0.0.1:8000/cart/";
  try {
    dispatch(Loading());
    const res = await axios.post(url, JSON.stringify(cartItem), {
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 201) dispatch(Success());
    else if (res.status === 200) dispatch(Success());
    else dispatch(Error());
  } catch (error) {
    dispatch(Error());
  }
};

export const getUserCart = (Id, page) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/cart/${Id}/?page=${page}`;
  try {
    dispatch(Loading());
    const res = await axios.get(url);
    if (res.status === 200) {
      dispatch(ListProducts(res.data));
    } else {
      dispatch(Error());
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const deleteCartItem = (productId) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/cart/${productId}`;
  try {
    dispatch(Loading());
    const res = await axios.delete(url);
    if (res.status === 200) {
      dispatch(Delete(productId));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const deleteUserCart = (userId) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/cart-delete/${userId}/`;
  try {
    dispatch(Loading());
    const res = await axios.delete(url);
    if (res.status === 200) dispatch(Success());
    else dispatch(Error());
  } catch (error) {
    dispatch(Error());
  }
};
