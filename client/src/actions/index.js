import React from "react";
import axios from "axios";

export function getTopAlbums() {
  return async function (dispatch) {
    try {
      const topAlbums = await axios.get("http://localhost:3001/topalbums");
      console.log(topAlbums)
      return dispatch({
        type: "GET_TOP_ALBUMS",
        payload: topAlbums.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTopTracks() {
  return async function (dispatch) {
    try {
      const topTracks = await axios.get("http://localhost:3001/toptracks");
      return dispatch({
        type: "GET_TOP_TRACKS",
        payload: topTracks.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTopArtists() {
  return async function (dispatch) {
    try {
      const topArtists = await axios.get("http://localhost:3001/topartists");
      return dispatch({
        type: "GET_TOP_ARTISTS",
        payload: topArtists.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTopPlaylists() {
  return async function (dispatch) {
    try {
      const topPlaylists = await axios.get(
        "http://localhost:3001/topplaylists"
      );
      return dispatch({
        type: "GET_TOP_PlAYLISTS",
        payload: topPlaylists.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTopStations() {
  return async function (dispatch) {
    try {
      const topStations = await axios.get("http://localhost:3001/topstations");
      return dispatch({
        type: "GET_TOP_PlAYLISTS",
        payload: topStations.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getName(name) {
  return async function (dispatch) {
      try {
        if(name.length === 0) return alert("need to write a music")
        const musicName = await axios.get(`http://localhost:3001?name=${name}`);
        return dispatch({
          type: "GET_NAME",
          payload: musicName.data,
        });
      } catch (error) {
        console.log(error)
    }
  };
}

export function getId(id) {
    return async function (dispatch) {
        try {
          const musicId = await axios.get(`http://localhost:3001/${id}`);
          return dispatch({
            type: "GET_ID",
            payload: musicId.data,
          });
        } catch (error) {
          console.log(error)
      }
    };
  }
