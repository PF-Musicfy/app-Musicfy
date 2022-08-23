import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const infoMusic = createSlice({
  name: 'music',
  initialState: {
    topMusic: [],
    detailTracks: {},
    musicSearch: [],
    feedback: []
  },
  reducers: {
    setTopMusic: (state, action) => {
      state.topMusic = action.payload
    },
    setMusicSearch: (state, action) => {
      state.musicSearch = action.payload
    },
    setDetailTracks: (state, action) => {
      state.detailTracks = action.payload
    },
    clearTopMusic: (state, action) => {
      state.topMusic = action.payload
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload
    },
  },
})

export const {
  setTopMusic,
  setMusicSearch,
  setDetailTracks,
  clearTopMusic,
  setFeedback
} = infoMusic.actions;

export default infoMusic.reducer;

export function getFeedback() {
  return async function (dispatch) {
    try {
      const posts = await axios.get(`${axios.defaults.baseURL}/feedback`);
      return dispatch(setFeedback(posts.data));
    } catch (error) {
      console.log('error getFeedback');
    }
  };
}

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
      if (name.length === 0) return alert("need to write a music")
      const musicName = await axios.get(`${axios.defaults.baseURL}/name?name=${name}`);
      return dispatch(setMusicSearch(musicName.data));
    } catch (error) {
      console.log(error)
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
        console.log(error)
      }
    };
  }
  
if (id.includes("alb")) {
  return async function (dispatch) {
    try {
      const albumId = await axios.get(`${axios.defaults.baseURL}/album/${id}`);
      return dispatch(setDetailTracks(albumId.data));
    } catch (error) {
      console.log(error)
    }
  };
}

if (id.includes("art")) {
  return async function (dispatch) {
    try {
      const artistId = await axios.get(`${axios.defaults.baseURL}/artist/${id}`);
      return dispatch(setDetailTracks(artistId.data));
    } catch (error) {
      console.log(error)
    }
  };
}

if (id.includes("pp")) {
  return async function (dispatch) {
    try {
      const artistId = await axios.get(`${axios.defaults.baseURL}/playlist/${id}`);
      return dispatch(setDetailTracks(artistId.data));
    } catch (error) {
      console.log(error)
    }
  };
}

}
export function topMusicClear() {
  return function (dispatch) {
    return dispatch(clearTopMusic({}))
  }
}
