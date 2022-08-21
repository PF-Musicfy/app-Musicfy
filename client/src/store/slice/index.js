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
        setTopAlbum: (state, action) => {
            state.topMusic = action.payload
        },
        setTopTracks: (state, action) => {
            state.topMusic = action.payload
        },
        setTopArtists: (state, action) => {
            state.topMusic = action.payload
        },
        setTopPlaylists: (state, action) => {
            state.topMusic = action.payload
        },
        setTopStations: (state, action) => {
            state.topMusic = action.payload
        },
        setMusicSearch: (state, action) => {
            state.musicSearch= action.payload
        },
        setDetailTracks: (state, action) => {
            state.detailTracks = action.payload
        }
    },
})

export const { setTopAlbum, setTopTracks, setTopArtists, setTopPlaylists, setTopStations, setMusicSearch, setDetailTracks } = infoMusic.actions;

export default infoMusic.reducer;


export function getTopAlbums() {
    return async function (dispatch) {
      try {
        const topAlbums = await axios.get("http://localhost:5000/topalbums");
        return dispatch(setTopAlbum(topAlbums.data));
      } catch (error) {
        console.log(error);
      }
    };
  }

  
export function getTopTracks() {
    return async function (dispatch) {
      try {
        const topTracks = await axios.get("http://localhost:5000/toptracks");
        return dispatch(setTopTracks(topTracks.data));
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  export function getTopArtists() {
    return async function (dispatch) {
      try {
        const topArtists = await axios.get("http://localhost:5000/topartists");
        return dispatch(setTopArtists(topArtists.data));
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  export function getTopPlaylists() {
    return async function (dispatch) {
      try {
        const topPlaylists = await axios.get("http://localhost:5000/topplaylists");
        return dispatch(setTopPlaylists(topPlaylists.data));
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  export function getTopStations() {
    return async function (dispatch) {
      try {
        const topStations = await axios.get("http://localhost:5000/topstations");
        return dispatch(setTopStations(topStations.data));
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
  