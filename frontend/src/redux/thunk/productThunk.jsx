import {
  Loading,
  Success,
  ListProduct,
  GetProduct,
  Delete,
  Error,
} from "../slice/productSlice";
import axios from "axios";

export const createProduct = (product) => async (dispatch) => {
  const url = "http://127.0.0.1:8000/products/";
  try {
    dispatch(Loading());
    const res = await axios.post(url, product, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.status === 201) {
      dispatch(Success());
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const getAllProducts = (page, sort, by) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/products/?page=${page}&sort=${sort}&by=${by}`;
  try {
    dispatch(Loading());
    const res = await axios.get(url);
    if (res.status === 200) {
      dispatch(ListProduct(res.data));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const getAllProductsWithSearch =
  (query, sort, by, page) => async (dispatch) => {
    const url = `http://127.0.0.1:8000/products/?search=${query}&page=${page}&sort=${sort}&by=${by}`;
    try {
      dispatch(Loading());
      const res = await axios.get(url);
      if (res.status === 200) {
        dispatch(ListProduct(res.data));
      }
    } catch (error) {
      dispatch(Error());
    }
  };

export const getProduct = (Id) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/products/${Id}`;
  try {
    dispatch(Loading());
    const res = await axios.get(url);
    if (res.status === 200) {
      dispatch(GetProduct(res.data));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/products/${id}/`;
  try {
    dispatch(Loading());
    const res = await axios.patch(url, product, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.status === 200) {
      dispatch(Success());
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const reduceProduct = (id, price) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/product-update/${id}`;
  try {
    const res = await axios.patch(
      url,
      JSON.stringify({ countInStock: price }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      dispatch(Success());
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const deleteProduct = (Id) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/products/${Id}`;
  try {
    dispatch(Loading());
    const res = await axios.delete(url);
    if (res.status === 200) {
      dispatch(Delete(Id));
    }
  } catch (error) {
    dispatch(Error());
  }
};
