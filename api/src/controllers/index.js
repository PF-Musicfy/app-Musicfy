const axios = require('axios')

// playlist: https://api.napster.com/v2.0/playlists?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm

const topTracks = async () =>{

    const tracks = await axios.get('https://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10');
   const apiInfo = await tracks.data.tracks.map( e => {
       return{
           id : e.id,
           name: e.name,
           artistName: e.artistName,
           previewURL: e.previewURL,
           albumName: e.albumName,
           image: `https://api.napster.com/imageserver/v2/artists/${e.artistId}/images/356x237.jpg`
       }
   })
       return apiInfo
   }

const topAlbums = async () =>{

 const albums = await axios.get('http://api.napster.com/v2.2/albums/new?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10');
const apiInfo = await albums.data.albums.map( e => {
    return{
        id : e.id,
        name: e.name,
        artistName: e.artistName,
        trackCount: e.trackCount,
        images: `https://api.napster.com/imageserver/v2/albums/${e.id}/images/356x237.jpg`
    }
})
    return apiInfo
}

const topArtists = async () =>{

    const artist = await axios.get('https://api.napster.com/v2.2/artists/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10');
   const apiInfo = await artist.data.artist.map( e => {
       return{
           id : e.id,
           name: e.name,
           shortcut: e.shortcut,
           images: `https://api.napster.com/imageserver/v2/artists/${e.id}/images/356x237.jpg`
       }
   })
       return apiInfo
   }
   
const topPlaylists = async () =>{

    const playlist = await axios.get('https://api.napster.com/v2.2/playlists/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10');
   const apiInfo = await playlist.data.playlist.map( e => {
       return{
           id : e.id,
           name: e.name,
           trackCount: e.trackCount,
           images: `https://api.napster.com/imageserver/v2/playlists/${e.id}/artists/images/356x237.jpg`
       }
   })
       return apiInfo
   }

   const topStations = async () =>{

    const stations = await axios.get('https://api.napster.com/v2.2/stations/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10');
   const apiInfo = await stations.data.stations.map( e => {
       return{
           id : e.id,
           name: e.name,
           artists: e.artists,
           summary: e.summary,
           images: `https://api.napster.com/imageserver/v2/stations/${e.id}/images/356x237.jpg`
       }
   })
       return apiInfo
   }


const getByName = async (name) => {
        const byName = await axios.get(`http://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&per_type_limit=5&query=${name}`)

        const albums = await byName.data.search.data.albums.map( e => {
            return{
                id : e.id,
                name: e.name,
                artistName: e.artistName,
                trackCount: e.trackCount,
                images: `https://api.napster.com/imageserver/v2/albums/${e.id}/images/356x237.jpg`
            }
        })

        const artists = await byName.data.search.data.artists.map( e => {
            return{
                id : e.id,
                name: e.name,
                shortcut: e.shortcut,
                images: `https://api.napster.com/imageserver/v2/artists/${e.id}/images/356x237.jpg`
            }
        })

        const tracks = await byName.data.search.data.tracks.map( e => {
            return{
                id : e.id,
                name: e.name,
                artistName: e.artistName,
                previewURL: e.previewURL,
                albumName: e.albumName,
                image: `https://api.napster.com/imageserver/v2/artists/${e.artistId}/images/356x237.jpg`
            }
        })

        const playlists = await byName.data.search.data.playlists.map( e => {
            return{
                id : e.id,
                name: e.name,
                trackCount: e.trackCount,
                images: `https://api.napster.com/imageserver/v2/playlists/${e.id}/artists/images/356x237.jpg`
            }
        })

    const obj = { albums, artists, tracks, playlists}

    return obj
}   

const getTrackId = async (id) => {
    const trackId = await axios.get(`http://api.napster.com/v2.2/tracks/${id}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`)
    const track = trackId.data.tracks.map(e => {
        return {
            id: e.id,
            name: e.name,
            artistName: e.artistName,
            albumName: e.albumName,
            images: `https://api.napster.com/imageserver/v2/artists/${e.artistId}/images/356x237.jpg`,
            playbackSeconds: e.playbackSeconds,
            previewURL: e.previewURL
        }
    })
    return track

}



module.exports= { topAlbums , topPlaylists, topTracks, topArtists, topStations, getByName, getTrackId }