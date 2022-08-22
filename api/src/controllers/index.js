const axios = require("axios");
  const apiKey = 'YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4';
  const urlNapster = 'https://api.napster.com/imageserver/v2';
  const mainUrl = 'https://api.napster.com/v2.2'

  const topMusic = async () => {

  const tracks = await axios.get(
    `${mainUrl}/tracks/top?apikey=${apiKey}&limit=10`
  );
  const apiTracks = await tracks.data.tracks.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      previewURL: e.previewURL,
      albumName: e.albumName,
      images: `${urlNapster}/artists/${e.artistId}/images/356x237.jpg`
    };

  });

  const albums = await axios.get(
    `${mainUrl}/albums/new?apikey=${apiKey}&limit=10`
  );
  const apiAlbums = await albums.data.albums.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      trackCount: e.trackCount,
      images: `${urlNapster}/albums/${e.id}/images/356x237.jpg`,
    };
  });

  const artists = await axios.get(
    `${mainUrl}/artists/top?apikey=${apiKey}&limit=10`
  );
  const apiArtists = await artists.data.artists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      shortcut: e.shortcut,
      images: `${urlNapster}/artists/${e.id}/images/356x237.jpg`,
    };
  });

  const playlists = await axios.get(
    `${mainUrl}/playlists/top?apikey=${apiKey}&limit=10`
  );
  const apiPlaylists = await playlists.data.playlists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      trackCount: e.trackCount,
      images: `${urlNapster}/playlists/${e.id}/artists/images/356x237.jpg`,
    };
  });

  const stations = await axios.get(
    `${mainUrl}/stations/top?apikey=${apiKey}&limit=10`
  );
  const apiStations = await stations.data.stations.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artists: e.artists,
      summary: e.summary,
      images: `${urlNapster}/stations/${e.id}/images/356x237.jpg`,
    };
  });

  const obj = { apiTracks, apiAlbums, apiArtists, apiPlaylists, apiStations }

  return obj

  }


const getByName = async (name) => {
  const byName = await axios.get(
    `${mainUrl}/search?apikey=${apiKey}&per_type_limit=5&query=${name}`
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
    `${mainUrl}/tracks/${id}?apikey=${apiKey}`
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
  const trackAlbum = await axios.get(`${mainUrl}/albums/${trackAlbumId}/tracks?apikey=${apiKey}`)
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
    `${mainUrl}/albums/${id}?apikey=${apiKey}`
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
  const albumTracks = await axios.get(`${mainUrl}/albums/${idAlbum}/tracks?apikey=${apiKey}`)
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
    `${mainUrl}/artists/${id}?apikey=${apiKey}`
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
  const artistAlbum = await axios.get(`${mainUrl}/albums/${group}/tracks?apikey=${apiKey}`)
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
    `${mainUrl}/playlists/${id}?apikey=${apiKey}`
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
  const albumPlaylist = await axios.get(`${mainUrl}/playlists/${PlaylistId}/tracks?apikey=${apiKey}&limit=15`)
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
