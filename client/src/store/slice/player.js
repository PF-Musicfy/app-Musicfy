import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    playlist: [],
    previous: {},
    actual: {},
    next: {},
    favorites: []
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
    },
    setFavorites: (state, action) => {
      state.favorites = state.favorites.concat(action.payload)
    },
    setRemove: (state, action) => {
      state.favorites = action.payload
    },
  },
});


export const { setPrevious, setActual, setNext, setPlaylist, setLoading, setFavorites, setRemove } = playerSlice.actions;

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

export const getFavorites = (id) => {
    return async function(dispatch, getState ){
      try {
        const { favorites } = getState().player
        const { playlist } = getState().player
        const filter = playlist.filter(e => e.id === id)
        let i = favorites.map(e => e.id).indexOf(id)
        if(favorites[i] === undefined){
      return dispatch(setFavorites(filter))
      }else{
        const remove = favorites.filter(e => e.id !== id )
        return dispatch(setRemove(remove))
      }
      } catch (error) {
        console.log(error)
      }
    }
}

export const clearFavorites = () => {
  return function(dispatch){
    try {
      return dispatch(setFavorites([]))
    } catch (error) {
      console.log(error)
    }
  }
}
