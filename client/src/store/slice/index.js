import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const infoMusic = createSlice({
  name: "music",
  initialState: {
    topMusic: [],
    detailTracks: {},
    musicSearch: [],
    avatar: "",
    usermp3: ""
  },
  reducers: {
    setTopMusic: (state, action) => {
      state.topMusic = action.payload;
    },
    setMusicSearch: (state, action) => {
      state.musicSearch = action.payload;
    },
    setDetailTracks: (state, action) => {
      state.detailTracks = action.payload;
    },
    setImageAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setUserMp3: (state, action) => {
      state.usermp3 = action.payload;
    }
  }
});

export const { setTopMusic, setMusicSearch, setDetailTracks, setImageAvatar, setUserMp3 } = infoMusic.actions;
export default infoMusic.reducer;

// Kosovomba

export function getTopsByGenre(combFilter) {
  return async function (dispatch) {
    try {
      console.log(combFilter);
      const topsByGenre = await axios.get(
        `${axios.defaults.baseURL}/genres/${combFilter.genre[1]}/${combFilter.tops.toLowerCase()}`
      );
      console.log(topsByGenre.data);
      return dispatch(setMusicSearch({ [combFilter.tops.toLowerCase()]: topsByGenre.data }));
    } catch (error) {
      console.log(error);
    }
  };
}

// Kosovomba

export function getTopMusic() {
  return async function (dispatch) {
    try {
      const topMusicApi = await axios.get(`${axios.defaults.baseURL}/topmusic`);
      return dispatch(setTopMusic(topMusicApi.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getName(name) {
  return async function (dispatch) {
    try {
      if (name.length === 0) return alert("need to write a music");
      const musicName = await axios.get(`${axios.defaults.baseURL}/name?name=${name}`);
      return dispatch(setMusicSearch(musicName.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTrackId(id) {
  if (id.includes("tra")) {
    return async function (dispatch) {
      try {
        const trackId = await axios.get(`${axios.defaults.baseURL}/track/${id}`);
        return dispatch(setDetailTracks(trackId.data));
      } catch (error) {
        console.log(error);
      }
    };
  }

  if (id.includes("alb")) {
    return async function (dispatch) {
      try {
        const albumId = await axios.get(`${axios.defaults.baseURL}/album/${id}`);
        return dispatch(setDetailTracks(albumId.data));
      } catch (error) {
        console.log(error);
      }
    };
  }

  if (id.includes("art")) {
    return async function (dispatch) {
      try {
        const artistId = await axios.get(`${axios.defaults.baseURL}/artist/${id}`);
        return dispatch(setDetailTracks(artistId.data));
      } catch (error) {
        console.log(error);
      }
    };
  }

  if (id.includes("pp") || id.includes("mp")) {
    return async function (dispatch) {
      try {
        const artistId = await axios.get(`${axios.defaults.baseURL}/playlist/${id}`);
        return dispatch(setDetailTracks(artistId.data));
      } catch (error) {
        console.log(error);
      }
    };
  }
}
export function topMusicClear() {
  return function (dispatch) {
    return dispatch(setTopMusic([]));
  };
}

export function getAvatar(imageSelected) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", imageSelected);
      formData.append("upload_preset", "musicfy");
      const infoImage = await axios.post("https://api.cloudinary.com/v1_1/hugok2k/image/upload", formData);
      // Ejecutar una funcion que modifique el avatar del usuario en DB
      return dispatch(setImageAvatar(infoImage.data.secure_url));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getMP3(mp3Selected) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", mp3Selected);
      formData.append("upload_preset", "musicfy");
      const infoMP3 = await axios.post("https://api.cloudinary.com/v1_1/hugok2k/video/upload", formData);
      // Ejecutar una funcion que modifique el avatar del usuario en DB
      console.log(infoMP3.data.secure_url);
      return dispatch(setUserMp3(infoMP3.data.secure_url));
    } catch (error) {
      console.log(error);
    }
  };
}
