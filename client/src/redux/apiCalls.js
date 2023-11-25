import { publicRequest } from "../utilities/request";
import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/api/auth/login", user);
    console.log(res)
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