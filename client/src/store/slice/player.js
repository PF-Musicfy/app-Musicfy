import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    playlist: [],
    previous: {},
    actual: {},
    next: {},
  },
  reducers: {
    setPrevious: (state, action) => {
      state.previous = state.actual;
    },
    setActual: (state, action) => {
      state.actual = action.payload;
    },
    setNext: (state, action) => {
      state.next = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setPrevious, setActual, setNext, setPlaylist, setLoading } = playerSlice.actions;

export default playerSlice.reducer;

export const forwardPlaylist = (song) => {
  return async function (dispatch, getState) {
    try {
      const { playlist } = getState().player
      const i = playlist.map(e => e.id).indexOf(song.id)

      if(playlist[i+1] === undefined ) return dispatch(setActual({}));

      dispatch(setActual(playlist[i+1]));
    } catch (e) {
      console.log("error: action play");
    }
  }
}

export const backPlaylist = (song) => {
  return async function (dispatch, getState) {
    try {
      const { playlist } = getState().player
      const i = playlist.map(e => e.id).indexOf(song.id)

      if(playlist[i-1] === undefined ) return dispatch(setActual({}));

      dispatch(setActual(playlist[i-1]));
    } catch (e) {
      console.log("error: action play");
    }
  }
}

export const randomPlaylist = () => {
  return async function (dispatch, getState) {
    try {
      const { playlist } = getState().player
      const i = Math.floor(Math.random() * playlist.length)

      if(playlist[i] === undefined ) return dispatch(setActual({}));

      dispatch(setActual(playlist[i]));
    } catch (e) {
      console.log("error: action play");
    }
  }
}
