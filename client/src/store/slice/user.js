import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    feedback: [],
    users: [],
    user: {},
    userToken: {},
  },
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = action.payload.reverse();
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

export const { setFeedback, setUsers, setUser, setUserToken } =
  userSlice.actions;

export default userSlice.reducer;

function elCreador(url = "", cb1, cb2) {
  return async function (dispatch) {
    if (typeof cb2 === "function") dispatch(cb2());
    try {
      const { data } = await axios.get(axios.defaults.baseURL + url);
      dispatch(cb1(data));
    } catch (e) {
      console.log("error: action ", cb1.name);
    }
  };
}
export const getFeedback = () => elCreador("/feedback", setFeedback);
export const getUsers = () => elCreador("/user", setUsers);
export const getUsersFree = () => elCreador("/user/free", setUsers);
export const getUsersPremium = () => elCreador("/user/premium", setUsers);
export const getUsersAdmin = () => elCreador("/user/admin", setUsers);
export const getUserByName = (user) =>
  elCreador(`/user?username=${user}`, setUsers);
export const getOnline = (id) => elCreador(`/user/online/${id}`, setUsers);

export const userTokenInfo = () => {
  return async function (dispatch) {
    try {
      const resToken = await fetch(
        "http://localhost:5000/api/v1/auth/refresh",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const { token } = await resToken.json();
      // console.log(token);

      const res = await fetch("http://localhost:5000/api/v1/auth/perfil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return dispatch(setUserToken(data));
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  };
};

export const userTokenPremium = (premium) => {
  return async function (dispatch) {
    console.log(premium);
    try {
      const resToken = await fetch(
        "http://localhost:5000/api/v1/auth/refresh",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const { token } = await resToken.json();
      console.log(token);

      const res = await fetch("http://localhost:5000/api/v1/auth/premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ premium }),
      });

      const data = await res.json();
      return dispatch(setUserToken(data));
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  };
};

export const logoutInfo = async () => {
    try {
      return await fetch(
        "http://localhost:5000/api/v1/auth/logout",
        {
          method: "GET",
          credentials: "include",
        }
      );

  }catch(error){
    console.log(error)
  }
};
