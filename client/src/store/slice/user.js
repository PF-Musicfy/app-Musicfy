import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const userSlice = createSlice({
  name: "user",
  initialState: {
    feedback: [],
    users: [],
    user: {},
    loading: "",
    favorites: [],
    usermodal: {},
    // playlists: [] 
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserModal: (state, action) => {
      state.usermodal = action.payload;
    },
    // setPlaylists: (state, action) => {
    //   state.playlists = state.playlists.concat(action.payload);
    // }
  }
});

export const { setFeedback, setUsers, setUser, setLoading, setUserModal } = userSlice.actions;

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
export const getUserModal = (email) => elCreador(`/user/usermodal?email=${email}`, setUserModal);

export const getOnline = (id) => elCreador(`/user/online/${id}`, setUsers);

export const userTokenInfo = () => {
  return async function (dispatch) {
    dispatch(setLoading("Loading..."));
    try {
      const token = cookies.get("refreshToken");
      dispatch(setLoading("Welcome..."));

      const { data } = await axios.get(`${axios.defaults.baseURL}/api/v1/auth/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setUser(data));
      dispatch(setLoading("Data..."));
    } catch (e) {
      console.log("No se encontro el token", e);
      dispatch(setLoading("Can't find token"));
    }
    dispatch(setLoading(""));
  };
};

export const userTokenPremium = (premium = true) => {
  return async function (dispatch) {
    try {
      // const resToken = await fetch(
      //   "http://localhost:5000/api/v1/auth/refresh",
      //   {
      //     method: "GET",
      //     credentials: "include",
      //   }
      // );

      // const { token } = await resToken.json();
      const token = cookies.get("refreshToken");
      console.log("en dispatch");

      await fetch(`${axios.defaults.baseURL}/api/v1/auth/premium`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ premium })
      });

      // const data = await res.json();
      // console.log(data);
      // return dispatch(setUser(data));
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  };
};

export const userTokenAvatar = (avatar) => {
  return async function (dispatch) {
    try {
      // const resToken = await fetch(
      //   "http://localhost:5000/api/v1/auth/refresh",
      //   {
      //     method: "GET",
      //     credentials: "include",
      //   }
      // );
      // const { token } = await resToken.json();
      const token = cookies.get("refreshToken");
      const res = await fetch(`${axios.defaults.baseURL}/api/v1/auth/setavatar`, {
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

export async function getMercadoPago(email, btnPrice, month) {
  try {
    const emailVerify = await axios.get(`${axios.defaults.baseURL}/subscription/${email}/${btnPrice}/${month}`);
    return { url: emailVerify.data.init_point, id: emailVerify.data.id };
  } catch (error) {
    console.log(error);
  }
}

export const logoutUser = () => {
  return async function (dispatch) {
    try {
      await axios.get(`${axios.defaults.baseURL}/api/v1/auth/logout`, {
        withCredentials: true
      });
      cookies.remove("refreshToken");

      console.log("cookie clear");
      dispatch(setUser({}));
    } catch (e) {
      console.log("error logout");
    }
  };
};

export const favoritesUser = (favorites) => {
  return async function () {
    try {
      // const resToken = await fetch(
      //   `${axios.defaults.baseURL}/api/v1/auth/refresh`,
      //   {
      //     method: "GET",
      //     credentials: "include",
      //   }
      // );
      // const { token } = await resToken.json();
      const token = cookies.get("refreshToken");
      const res = await fetch(`${axios.defaults.baseURL}/api/v1/auth/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ favorites })
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  };
};

export const removeFavorites = (remove) => {
  return async function () {
    try {
      // const resToken = await fetch(`${axios.defaults.baseURL}/api/v1/auth/refresh`, {
      //   method: "GET",
      //   credentials: "include"
      // });
      // const { token } = await resToken.json();
      const token = cookies.get("refreshToken");
      const res = await fetch(`${axios.defaults.baseURL}/api/v1/auth/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ remove })
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  };
};

export const playlistUser = (playlist) => {
  return async function () {
    try {
      const token = cookies.get("refreshToken");
      const res = await fetch(`${axios.defaults.baseURL}/api/v1/auth/playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ playlist })
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  };
};

export const uploadMp3User = (usermp3) => {
  return async function () {
    try {
      const token = cookies.get("refreshToken");
      await fetch(`${axios.defaults.baseURL}/api/v1/auth/setmp3`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ usermp3 })
      });
    } catch (error) {
      console.log("Ocurrio un error guardo mp3 en db", error);
    }
  };
};

export const musicPlaylist = (music, name) => {
  return async function () {
    try {
      const token = cookies.get("refreshToken");
      const res = await fetch(`${axios.defaults.baseURL}/api/v1/auth/musicplaylist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ music, name })
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  };
};

// export const playlistName = (name) => {
//   return async function (dispatch){
//     try {
//       return dispatch(setPlaylists(name))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// export const clearPlaylistName = () => {
//   return async function (dispatch){
//     try {

//       return dispatch(setPlaylists({}))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// export const musicPlaylist = (music, name) => {
//   return async function (dispatch, getState){
//     try {
//       const { playlists } = getState().user
//       const filterName = playlists.filter(e => e.name === name)
//       console.log(filterName)
//       if(filterName){
//         const musicFilter = filterName[0]
//         musicFilter.music = music
//         playlists.concat(musicFilter)
//         console.log("soy playlist new", playlists)
//         return dispatch(setPlaylists(playlists))
//       }
//     } catch (error) {
      
//     }
//   }
// }

// export const getFavorites = (id) => {
//   return async function(dispatch, getState ){
//     try {
//       const { user } = getState().user
//       const filter = user.favorites.filter(e => e.id !== id)
//       console.log(filter)
//       return dispatch(setUser(filter))

//   let i = favorites.map(e => e.id).indexOf(id)
//   if(favorites[i] === undefined){
// return dispatch(setFavorites(filter))
// }else{
//   const remove = favorites.filter(e => e.id !== id )
//   return dispatch(setRemove(remove))
// }
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

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
