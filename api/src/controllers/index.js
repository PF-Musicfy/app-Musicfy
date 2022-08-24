const axios = require("axios");

const apiKey = 'apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4';
const urlNapster = 'https://api.napster.com/imageserver/v2';
const mainUrl = 'https://api.napster.com/v2.2'

function noRepetidos(arr){
  let hash = {}
  let result = arr.filter((e) => {
    const exist = !hash[e.id];
    hash[e.id] = true;
    return exist;
  })
  return result;
}

const topMusic = async () => {
  const {data: {tracks}} = await axios.get(`${mainUrl}/tracks/top?${apiKey}&limit=10`);
  const apiTrack = await tracks.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      previewURL: e.previewURL,
      albumName: e.albumName,
      images: `${urlNapster}/artists/${e.artistId}/images/356x237.jpg`
    };
  });

  const apiTracks = noRepetidos(apiTrack);

  const {data: {albums}} = await axios.get(`${mainUrl}/albums/new?${apiKey}&limit=10`);
  const apiAlbums = await albums.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      trackCount: e.trackCount,
      images: `${urlNapster}/albums/${e.id}/images/356x237.jpg`,
    };
  });

  const {data: {artists}} = await axios.get(`${mainUrl}/artists/top?${apiKey}&limit=10`);
  const apiArtists = await artists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      shortcut: e.shortcut,
      images: `${urlNapster}/artists/${e.id}/images/356x237.jpg`,
    };
  });

  const {data: {playlists}} = await axios.get(`${mainUrl}/playlists/top?${apiKey}&limit=10`);
  const apiPlaylists = await playlists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      trackCount: e.trackCount,
      images: `${urlNapster}/playlists/${e.id}/artists/images/356x237.jpg`,
    };
  });

  const {data: {stations}} = await axios.get(`${mainUrl}/stations/top?${apiKey}&limit=10`);
  const apiStations = await stations.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artists: e.artists,
      summary: e.summary,
      images: `${urlNapster}/stations/${e.id}/images/356x237.jpg`,
    };
  });

  return { apiTracks, apiAlbums, apiArtists, apiPlaylists, apiStations }
}

const getByName = async (name) => {
  const byName = await axios.get(
    `${mainUrl}/search?${apiKey}&per_type_limit=5&query=${name}`
  );

  const albums = byName.data.search.data.albums.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      trackCount: e.trackCount,
      images: `${urlNapster}/albums/${e.id}/images/356x237.jpg`,
    };
  });

  const artists = byName.data.search.data.artists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      shortcut: e.shortcut,
      images: `${urlNapster}/artists/${e.id}/images/356x237.jpg`,
    };
  });

  const tracks = byName.data.search.data.tracks.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      previewURL: e.previewURL,
      albumName: e.albumName,
      image: `${urlNapster}/artists/${e.artistId}/images/356x237.jpg`,
    };
  });

  const playlists = byName.data.search.data.playlists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      trackCount: e.trackCount,
      images: `${urlNapster}/playlists/${e.id}/artists/images/356x237.jpg`,
    };
  });

  const obj = { albums, artists, tracks, playlists };

  return obj;
};

const getTrackId = async (id) => {
  const trackId = await axios.get(
    `${mainUrl}/tracks/${id}?${apiKey}`
  );
  const track = trackId.data.tracks?.map((e) => {
      return {
      id: e.id,
      name: e.name,
      artistId: e.artistId,
      artistName: e.artistName,
      albumName: e.albumName,
      albumId: e.albumId,
      images: `${urlNapster}/artists/${e.artistId}/images/356x237.jpg`,
      playbackSeconds: e.playbackSeconds,
      previewURL: e.previewURL
    };
  });
  const trackAlbumId = trackId.data.tracks?.map(e => e.albumId)
  const trackAlbum = await axios.get(`${mainUrl}/albums/${trackAlbumId}/tracks?${apiKey}`)
  const tracksMusic = trackAlbum.data.tracks.map(e => {
    return{
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      previewURL: e.previewURL,
      playbackSeconds: e.playbackSeconds
    }
  })

const obj = {track, tracksMusic }
return obj  
};

const getAlbumId = async (id)=>{
  const albumId = await axios.get(
    `${mainUrl}/albums/${id}?${apiKey}`
  );
  const album = albumId.data.albums?.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      albumName: e.albumName,
      images: `${urlNapster}/albums/${e.id}/images/356x237.jpg`,
    };
  });
  const idAlbum = albumId.data.albums?.map(e => e.id)
  const albumTracks = await axios.get(`${mainUrl}/albums/${idAlbum}/tracks?${apiKey}`)
  const albumMusic = albumTracks.data.tracks?.map(e => {
    return{
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      previewURL: e.previewURL,
      playbackSeconds: e.playbackSeconds
    }
  })

  const obj = { album, albumMusic}

  return obj
}

const getArtistId = async (id)=>{
  const artistId = await axios.get(
    `${mainUrl}/artists/${id}?${apiKey}`
  );

  const artist = artistId.data.artists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      images: `${urlNapster}/artists/${e.id}/images/356x237.jpg`,
    };
  });

  const artistAlbumId = artistId.data.artists.map(e => e.albumGroups)
  const group = artistAlbumId.map(e => e.compilations[0])
  const artistAlbum = await axios.get(`${mainUrl}/albums/${group}/tracks?${apiKey}`)
  const artistMusic = artistAlbum.data.tracks.map(e => {
    return{
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      previewURL: e.previewURL,
      playbackSeconds: e.playbackSeconds
    }
  })

  const obj = { artist, artistMusic }

  return obj
}


const getPlaylistId = async (id)=>{
  const playlistId = await axios.get(
    `${mainUrl}/playlists/${id}?${apiKey}`
  );
  const playlist = playlistId.data.playlists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      albumName: e.albumName,
      images: `${urlNapster}/playlists/${e.id}/artists/images/1200x400.jpg?montage=3x2`,
    };
  });
  const PlaylistId = playlistId.data.playlists.map(e => e.id)
  const albumPlaylist = await axios.get(`${mainUrl}/playlists/${PlaylistId}/tracks?${apiKey}&limit=15`)
  const playlistMusic = albumPlaylist.data.tracks.map(e => {
    return{
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      previewURL: e.previewURL,
      playbackSeconds: e.playbackSeconds
    }
  })

  const obj = { playlist, playlistMusic}

  return obj
}



module.exports = {
  topMusic,
  getByName,
  getTrackId,
  getAlbumId,
  getArtistId,
  getPlaylistId
};
