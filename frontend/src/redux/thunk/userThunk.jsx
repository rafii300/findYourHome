import {
  Loading,
  Success,
  CurrentUser,
  ListUser,
  Delete,
  Error,
} from "../slice/userSlice";
import axios from "axios";

export const loginUser = (user) => async (dispatch) => {
  const url = "http://127.0.0.1:8000/login/";
  try {
    dispatch(Loading());
    const res = await axios.post(url, JSON.stringify(user), {
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 200) {
      dispatch(CurrentUser(res.data));
    } else dispatch(Error());
  } catch (error) {
    dispatch(Error());
  }
};

export const registerUser = (user) => async (dispatch) => {
  const url = "http://127.0.0.1:8000/users/";
  try {
    dispatch(Loading());
    const res = await axios.post(url, JSON.stringify(user), {
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 201) {
      dispatch(CurrentUser(res.data));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const getAllUsers = (page) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/users/?page=${page}`;
  try {
    dispatch(Loading());
    const res = await axios.get(url);
    if (res.status === 200) {
      dispatch(ListUser(res.data));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const getAllUsersWithSearch = (query, page) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/users/?search=${query}&page=${page}`;
  try {
    dispatch(Loading());
    const res = await axios.get(url);
    if (res.status === 200) {
      dispatch(ListUser(res.data));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const updateUserDetails = (user) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/users/${user.Id}/`;
  try {
    dispatch(Loading());
    const res = await axios.patch(url, JSON.stringify(user), {
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 200) {
      dispatch(CurrentUser(res.data));
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const updateToAdmin = (user) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/users/${user.Id}/`;
  try {
    dispatch(Loading());
    const res = await axios.patch(url, JSON.stringify(user), {
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 200) {
      dispatch(Success());
    }
  } catch (error) {
    dispatch(Error());
  }
};

export const deleteUser = (Id) => async (dispatch) => {
  const url = `http://127.0.0.1:8000/users/${Id}`;
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
