import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";

import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/api/auth/login", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const loggingOut = async (dispatch) => {
  dispatch(loginStart());
  try {
    dispatch(logout());
  } catch (err) {
    dispatch(loginFailure());
  }
};