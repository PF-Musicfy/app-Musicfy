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
        const topMusicApi = await axios.get("http://localhost:5000/topmusic");
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
          const musicName = await axios.get(`http://localhost:5000/name?name=${name}`);
          return dispatch(setMusicSearch(musicName.data));
        } catch (error) {
          console.log(error)
      }
    };
  }
  
  export function getId(id) {
      return async function (dispatch) {
          try {
            const musicId = await axios.get(`http://localhost:5000/${id}`);
            return dispatch(setDetailTracks(musicId.data));
          } catch (error) {
            console.log(error)
        }
      };
    }

  export function topMusicClear() {
    return function (dispatch){
      return dispatch(clearTopMusic({}))
    }
  }