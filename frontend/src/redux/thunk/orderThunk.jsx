import {
  Loading,
  Error,
  CurrentOrder,
  CurrentOrderState,
  ListOrders,
  Delete,
} from "../slice/orderSlice";
import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
  const url = "http://127.0.0.1:8000/orders/";
  try {
    dispatch(Loading());
    const res = await axios.post(url, JSON.stringify(order), {
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 201) {
      dispatch(CurrentOrder(res.data.Id));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const getAllOrders = (page, status) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/orders/?page=${page}&status=${status}`;
  try {
    dispatch(Loading());
    const res = await axios.get(url);
    if (res.status === 200) {
      dispatch(ListOrders(res.data));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const getUserOrders = (id, page) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/orders/${id}/?page=${page}`;
  try {
    dispatch(Loading());
    const res = await axios.get(url);
    if (res.status === 200) {
      dispatch(ListOrders(res.data));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const getOrderById = (id) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/orders/pending/${id}/`;
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      dispatch(CurrentOrderState(res.data.pending));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const clearPendingOrder = (id) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/orders/pending/${id}/`;
  try {
    dispatch(Loading());
    const res = await axios.patch(url, JSON.stringify({ pending: false }), {
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 200) {
      dispatch(Delete(id));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const deleteOrderItem = (id) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/orders/pending/${id}`;
  try {
    dispatch(Loading());
    const res = await axios.delete(url);
    if (res.status === 200) {
      dispatch(Delete(id));
    }
  } catch (error) {
    dispatch(Error());
  }
};
