import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";

import styles from "./indexHome.module.css";
import { getTopMusic, topMusicClear, getTopsByGenre } from "store/slice/index";

import "swiper/css";
/*
        // className={styles.swiper}
        // spaceBetween={-70}
        slidesPerView={5}
        slidesPerGroup={3}
        // Responsive breakpoints
*/
function Listas({ arr, objKey }){
  const { musicSearch } = useSelector((state) => state.music);

  return (
    <>
      {/*
      <h1 className={styles.titleGenre}>
        {objKey[0].toUpperCase() + objKey.substring(1)}
      </h1>
      */}
      <Swiper
        className={styles.swiperGlobal}
        loop={false}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          220: {slidesPerView: 1},
          500: {slidesPerView: 2},
          600: {slidesPerView: 2},
          750: {slidesPerView: 3},
          1000: {slidesPerView: 4},
          1250: {slidesPerView: 5},
        }}
      >
        <div>
          {Object.keys(musicSearch).length
            ? musicSearch[objKey]?.map((item) => (
                <SwiperSlide className={styles.containerSwiper} key={item.id}>
                  <Card item={item} />
                </SwiperSlide>
              ))
            : arr?.map((item) => (
                <SwiperSlide className={styles.containerSwiper} key={item.id}>
                  <Card item={item} />
                </SwiperSlide>
              ))
          }
        </div>
      </Swiper>
    </>
  )
}

function Card({ item }) {
  return (
    <div className={styles.cardImages}>
    <Link to={`/home/${item.id}`}>
      <img
        className={styles.imgSwiper}
        src={item.images || item.image}
        alt={item.name}
        onError={(e) => {
          e.target.src = "https://pixabay.com/es/images/download/icon-1968245_640.png"
        }}
      />
      <h3 className={styles.h3Colors}>{item.name}</h3>
      <h3 className={styles.h3Colors}>{item.artistName}</h3>
    </Link>
    </div>
  )
}

export default function HomeAlbum() {
  const dispatch = useDispatch();
  const { topMusic } = useSelector((state) => state.music);
  const { musicSearch } = useSelector((state) => state.music);

  useEffect(() => {
    if (topMusic.length === 0) dispatch(getTopMusic());
  }, []);

  useEffect(() => {
    if (musicSearch.length !== 0) dispatch(topMusicClear())
  }, [musicSearch])

  const [state, setState] = useState({
    tracks: true,
    albums: true,
    playlist: true,
    artist: true,
  })

  //console.log(topMusic);
  // console.log(musicSearch);

  const [combFilter, setCombFilter] = useState({
    genre: ['Choose genre', ''],
    tops: 'Choose option'
  })
  
  const genreOptions = [
    ['Choose genre', ''],
    ["Pop", "g.115"],
    ["Rock", "g.5"],
    ["Alternative", "g.33"],
    ["Hip-Hop/Rap", "g.146"],
    ["R&B/Soul", "g.194"],
    ["Country", "g.407"],
    ["Jazz", "g.299"],
    ["Dance/Electronica", "g.71"],
    ["Latin", "g.510"],
    ["World", "g.488"],
    ["Reggae", "g.383"],
    ["Classical", "g.21"],
    ["Oldies", "g.4"],
    ["New Age", "g.453"],
    ["Christian/Gospel", "g.75"],
    ["Blues", "g.438"],
    ["Folk", "g.446"],
    ["Easy Listening", "g.69"],
    ["Soundtracks", "g.246"],
    ["Children", "g.470"],
    ["Comedy/Spoken Word", "g.156"],
    ["Metal", "g.394"]
  ];

  let genreOption = []

  const changingState = (e) => {
    setState({
      tracks: e.target.name === 'tracks' ? true : false,
      albums: e.target.name === 'albums' ? true : false,
      playlist: e.target.name === 'playlist' ? true : false,
      artist: e.target.name === 'artist' ? true : false,
    })
  }

  return (
    <div className={styles.albumSuperiorContainer}>

      <div className={styles.buttonsFilter}>
        {<button
          className={state.tracks ? styles.buttonStyles : styles.buttonOff}
          name='tracks'
          onClick={(e) => changingState(e)}
        >
          Tracks
        </button>}
        {<button
          className={state.albums ? styles.buttonStyles : styles.buttonOff}
          name='albums'
          onClick={(e) => changingState(e)}
        >
          Albums
        </button>}
        {<button
          className={state.playlist ? styles.buttonStyles : styles.buttonOff}
          name='playlist'
          onClick={(e) => changingState(e)}
        >
          Playlist
        </button>}
        {<button
          className={state.artist ? styles.buttonStyles : styles.buttonOff}
          name='artist'
          onClick={(e) => changingState(e)}
        >
          Artist
        </button>}
        {<button
          className={styles.buttonStyles}
          name='reset'
          onClick={() => {
            setState({
              tracks: true,
              albums: true,
              playlist: true,
              artist: true,
            })
          }}
        >
          Reset filters
        </button>}
      </div>

      <div className={styles.buttonsFilter}>
        <span>Tops by genre: </span>
        <select
          name='genre'
          className={styles.selectorFilter}
          onChange={(e) => {
            genreOption = genreOptions.filter((g) => g[0] === e.target.value)
            setCombFilter({ ...combFilter, genre: genreOption[0] })
          }}
          value={combFilter.genre[0]}
        >
          {/* <option>Choose genre</option> */}
          {genreOptions.map((g) => {
            return <option key={g[0]} value={g[0]}>{g[0]}</option>
          })}
        </select>
        <select
          className={styles.selectorFilter}
          name='tops'
          onChange={(e) => setCombFilter({ ...combFilter, tops: e.target.value })}
          value={combFilter.tops}
        >
          <option>Choose option</option>
          <option>Tracks</option>
          <option>Albums</option>
          <option>Artists</option>
          <option>Playlists</option>
        </select>
        <button
          onClick={() => dispatch(getTopsByGenre(combFilter))}
          disabled={combFilter.genre[0] === 'Choose genre'
            ? true
            : (combFilter.tops === 'Choose option' ? true : false)}
        >
          Search
        </button>
      </div>

      <div className={state.tracks ? '' : styles.containerAlbumes}>
        {musicSearch.length === 0
          ? <h1 className={styles.titleGenre}>Top Tracks</h1>
          : (musicSearch.tracks
            ? <h1 className={styles.titleGenre}>Tracks</h1>
            : false)
        }
        <Listas arr={topMusic.apiTracks} objKey={'tracks'}/>
      </div>

      <div className={state.albums ? '' : styles.containerAlbumes}>
        {musicSearch.length === 0
          ? <h1 className={styles.titleGenre}>Top Albums</h1>
          : (musicSearch.albums
            ? <h1 className={styles.titleGenre}>Albums</h1>
            : false)
        }
        <Listas arr={topMusic.apiAlbums} objKey={'albums'}/>
      </div>

      <div className={state.artist ? '' : styles.containerAlbumes}>
        {musicSearch.length === 0
          ? <h1 className={styles.titleGenre}>Top Artists</h1>
          : (musicSearch.artists
            ? <h1 className={styles.titleGenre}>Artists</h1>
            : false)
        }
        <Listas arr={topMusic.apiArtists} objKey={'artists'}/>
      </div>

      <div className={state.playlist ? '' : styles.containerAlbumes}>
        {musicSearch.length === 0
          ? <h1 className={styles.titleGenre}>Top Playlist</h1>
          : (musicSearch.playlists
            ? <h1 className={styles.titleGenre}>Playlist</h1>
            : false)
        }
        <Listas arr={topMusic.apiPlaylists} objKey={'playlists'}/>
      </div>
    </div>
  );
}
