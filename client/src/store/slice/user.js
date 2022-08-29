import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    feedback: [],
    users: [],
    user: {}
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
    }
  }
});

export const { setFeedback, setUsers, setUser } = userSlice.actions;

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
export const getUserByName = (user) => elCreador(`/user?username=${user}`, setUsers);
export const getOnline = (id) => elCreador(`/user/online/${id}`, setUsers);

export const userTokenInfo = () => {
  return async function (dispatch) {
    try {
      const {
        data: { token }
      } = await axios.get(`${axios.defaults.baseURL}/api/v1/auth/refresh`, {
        withCredentials: true
      });
      const { data } = await axios.get(`${axios.defaults.baseURL}/api/v1/auth/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setUser(data));
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  };
};

export const userTokenAvatar = (avatar) => {
  return async function (dispatch) {
    try {
      const resToken = await fetch("http://localhost:5000/api/v1/auth/refresh", {
        method: "GET",
        credentials: "include"
      });
      const { token } = await resToken.json();
      const res = await fetch("http://localhost:5000/api/v1/auth/setavatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ avatar })
      });
      const data = await res.json();
      return dispatch(setUser(data));
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  };
};

export const logoutUser = () => {
  return async function (dispatch) {
    try {
      await axios.get(`${axios.defaults.baseURL}/api/v1/auth/logout`, {
        withCredentials: true
      });
      console.log("cookie clear");
      dispatch(setUser({}));
    } catch (e) {
      console.log("error logout");
    }
  };
};

export const userTokenPremium = (premium = true) => {
  return async function (dispatch) {
    try {
      const resToken = await fetch("http://localhost:5000/api/v1/auth/refresh", {
        method: "GET",
        credentials: "include"
      });
      const { token } = await resToken.json();
      console.log(token);
      const res = await fetch("http://localhost:5000/api/v1/auth/premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ premium })
      });
      const data = await res.json();
      return dispatch(setUser(data));
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  };
};

export async function getMercadoPago(email) {
  try {
    const emailVerify = await axios.get(`${axios.defaults.baseURL}/subscription/${email}`);
    console.log(emailVerify);
    console.log({ url: emailVerify.data.init_point, id: emailVerify.data.id });
    return { url: emailVerify.data.init_point, id: emailVerify.data.id };
  } catch (error) {
    console.log(error);
  }
}
/* 
export function getUserIdPremium(id, premium = true) {
  return async function (dispatch) {
    if (id) {
      try {
        const idVerify = await axios.get(`${axios.defaults.baseURL}/subscription/${id}`);
        console.log(idVerify);
        const resToken = await fetch("http://localhost:5000/api/v1/auth/refresh", {
          method: "GET",
          credentials: "include"
        });
        const { token } = await resToken.json();
        console.log(token);
        const res = await fetch("http://localhost:5000/api/v1/auth/premium", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ premium })
        });
        const data = await res.json();
        return dispatch(setUser(data));
      } catch (error) {
        console.log(error);
      }
    }
  };
}
 */
