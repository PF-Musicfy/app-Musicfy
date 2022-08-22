const axios = require("axios");


  const topMusic = async () => {

  const tracks = await axios.get(
    "https://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10"
  );
  const apiTracks = await tracks.data.tracks.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      previewURL: e.previewURL,
      albumName: e.albumName,
      images: `https://api.napster.com/imageserver/v2/artists/${e.artistId}/images/356x237.jpg`
    };
  });

  const albums = await axios.get(
    "http://api.napster.com/v2.2/albums/new?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10"
  );
  const apiAlbums = await albums.data.albums.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      trackCount: e.trackCount,
      images: `https://api.napster.com/imageserver/v2/albums/${e.id}/images/356x237.jpg`,
    };
  });

  const artists = await axios.get(
    "https://api.napster.com/v2.2/artists/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10"
  );
  const apiArtists = await artists.data.artists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      shortcut: e.shortcut,
      images: `https://api.napster.com/imageserver/v2/artists/${e.id}/images/356x237.jpg`,
    };
  });

  const playlists = await axios.get(
    "https://api.napster.com/v2.2/playlists/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10"
  );
  const apiPlaylists = await playlists.data.playlists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      trackCount: e.trackCount,
      images: `https://api.napster.com/imageserver/v2/playlists/${e.id}/artists/images/356x237.jpg`,
    };
  });

  const stations = await axios.get(
    "https://api.napster.com/v2.2/stations/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10"
  );
  const apiStations = await stations.data.stations.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artists: e.artists,
      summary: e.summary,
      images: `https://api.napster.com/imageserver/v2/stations/${e.id}/images/356x237.jpg`,
    };
  });

  const obj = { apiTracks, apiAlbums, apiArtists, apiPlaylists, apiStations }

  return obj

  }


const getByName = async (name) => {
  const byName = await axios.get(
    `http://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&per_type_limit=5&query=${name}`
  );

  const albums = byName.data.search.data.albums.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      trackCount: e.trackCount,
      images: `https://api.napster.com/imageserver/v2/albums/${e.id}/images/356x237.jpg`,
    };
  });

  const artists = byName.data.search.data.artists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      shortcut: e.shortcut,
      images: `https://api.napster.com/imageserver/v2/artists/${e.id}/images/356x237.jpg`,
    };
  });

  const tracks = byName.data.search.data.tracks.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      previewURL: e.previewURL,
      albumName: e.albumName,
      image: `https://api.napster.com/imageserver/v2/artists/${e.artistId}/images/356x237.jpg`,
    };
  });

  const playlists = byName.data.search.data.playlists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      trackCount: e.trackCount,
      images: `https://api.napster.com/imageserver/v2/playlists/${e.id}/artists/images/356x237.jpg`,
    };
  });

  const obj = { albums, artists, tracks, playlists };

  return obj;
};

const getTrackId = async (id) => {
  const trackId = await axios.get(
    `http://api.napster.com/v2.2/tracks/${id}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`
  );
  const track = trackId.data.tracks?.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistId: e.artistId,
      artistName: e.artistName,
      albumName: e.albumName,
      albumId: e.albumId,
      images: `https://api.napster.com/imageserver/v2/artists/${e.artistId}/images/356x237.jpg`,
      playbackSeconds: e.playbackSeconds,
      previewURL: e.previewURL,
      
    };
  });
  const trackAlbumId = trackId.data.tracks?.map(e => e.albumId)
  const trackAlbum = await axios.get(`https://api.napster.com/v2.2/albums/${trackAlbumId}/tracks?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`)
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
    `https://api.napster.com/v2.2/albums/${id}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`
  );
  const album = albumId.data.albums?.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      albumName: e.albumName,
      images: `https://api.napster.com/imageserver/v2/albums/${e.id}/images/356x237.jpg`,
    };
  });
  const idAlbum = albumId.data.albums?.map(e => e.id)
  const albumTracks = await axios.get(`https://api.napster.com/v2.2/albums/${idAlbum}/tracks?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`)
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
    `https://api.napster.com/v2.2/artists/${id}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`
  );

  const artist = artistId.data.artists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      images: `https://api.napster.com/imageserver/v2/artists/${e.id}/images/356x237.jpg`,
    };
  });

  const artistAlbumId = artistId.data.artists.map(e => e.albumGroups)
  const group = artistAlbumId.map(e => e.compilations[0])
  const artistAlbum = await axios.get(`https://api.napster.com/v2.2/albums/${group}/tracks?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`)
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
    `https://api.napster.com/v2.2/playlists/${id}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`
  );
  const playlist = playlistId.data.playlists.map((e) => {
    return {
      id: e.id,
      name: e.name,
      artistName: e.artistName,
      albumName: e.albumName,
      images: `https://api.napster.com/imageserver/v2/albums/${e.id}/images/356x237.jpg`,
    };
  });
  const PlaylistId = playlistId.data.playlists.map(e => e.id)
  const albumPlaylist = await axios.get(`https://api.napster.com/v2.2/playlists/${PlaylistId}/tracks?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=15`)
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
