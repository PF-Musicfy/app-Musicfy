import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const infoMusic = createSlice({
    name: 'music',
    initialState: {
        topMusic: [],
        detailTracks: {},
        musicSearch: []
    },
    reducers: {
        setTopMusic: (state, action) => {
            state.topMusic = action.payload
        },
        setMusicSearch: (state, action) => {
            state.musicSearch= action.payload
        },
        setDetailTracks: (state, action) => {
            state.detailTracks = action.payload
        },
        clearTopMusic: (state, action) => {
          state.topMusic = action.payload
        }

    },
})

export const { setTopMusic, setMusicSearch, setDetailTracks, clearTopMusic } = infoMusic.actions;

export default infoMusic.reducer;


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
          if(name.length === 0) return alert("need to write a music")
          const musicName = await axios.get(`${axios.defaults.baseURL}/name?name=${name}`);
          return dispatch(setMusicSearch(musicName.data));
        } catch (error) {
          console.log(error)
      }
    };
  }
  
  export function getTrackId(id) {
    if(id.includes("tra")){
      return async function (dispatch) {
          try {
            const trackId = await axios.get(`http://localhost:5000/track/${id}`);
            return dispatch(setDetailTracks(trackId.data));
          } catch (error) {
            console.log(error)
        }
      };
    }
  }

  export function topMusicClear() {
    return function (dispatch){
      return dispatch(clearTopMusic({}))
    }
  }

    if(id.includes("alb")){
      return async function (dispatch) {
            try {
              const albumId = await axios.get(`http://localhost:5000/album/${id}`);
              return dispatch(setDetailTracks(albumId.data));
            } catch (error) {
              console.log(error)
          }
        };
    }  

    if(id.includes("art")){
      return async function (dispatch) {
          try {
            const artistId = await axios.get(`http://localhost:5000/artist/${id}`);
            return dispatch(setDetailTracks(artistId.data));
          } catch (error) {
            console.log(error)
        }
      };
    }

      if(id.includes("pp")){
        return async function (dispatch) {
            try {
              const artistId = await axios.get(`http://localhost:5000/playlist/${id}`);
              return dispatch(setDetailTracks(artistId.data));
            } catch (error) {
              console.log(error)
          }
        };
      }
    


  

