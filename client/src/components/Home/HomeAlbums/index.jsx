// Import Swiper React components
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./indexHome.module.css";
import "swiper/css/navigation";
import { getTopMusic, topMusicClear } from "../../../store/slice/index";
import { Link } from "react-router-dom"

// Import Swiper styles
import "swiper/css";


export default function HomeAlbum() {
  const dispatch = useDispatch();
  const { topMusic } = useSelector((state) => state.music);
  const { musicSearch } = useSelector((state) => state.music);

  const [state, setState] = useState({
    tracks: true,
    albums: true,
    playlist: true,
    artist: true,
  })

  // console.log(topMusic);
  // console.log(musicSearch);

  const changingState = (e) => {
    e.preventDefault();
    console.log('estoy funcionando')
    setState({
      tracks: e.target.name === 'tracks' ? true : false,
      albums: e.target.name === 'albums' ? true : false,
      playlist: e.target.name === 'playlist' ? true : false,
      artist: e.target.name === 'artist' ? true : false,
    })
    // setState({...state, [e.target.name]: state[e.target.name] === true ? false : true})
  }

  const onClickResetFilters = () => {
    setState({
      tracks: true,
      albums: true,
      playlist: true,
      artist: true,
    })
  }

  useEffect(() => {
    dispatch(getTopMusic());
  }, []);

  useEffect(() => {
    dispatch(topMusicClear())
  }, [musicSearch])


  const onImgError = (e) => {
    e.target.src = "https://pixabay.com/es/images/download/icon-1968245_640.png";
  }

  return (
    <div className={styles.albumSuperiorContainer}>

      <div className={styles.buttonsFilter}>
        {musicSearch.length === 0 ? false : <button className={state.tracks === true ? styles.buttonStyles : styles.buttonOff} name='tracks' onClick={(e) => changingState(e)}>Tracks</button>}
        {musicSearch.length === 0 ? false : <button className={state.albums === true ? styles.buttonStyles : styles.buttonOff} name='albums' onClick={(e) => changingState(e)}>Albums</button>}
        {musicSearch.length === 0 ? false : <button className={state.playlist === true ? styles.buttonStyles : styles.buttonOff} name='playlist' onClick={(e) => changingState(e)}>Playlist</button>}
        {musicSearch.length === 0 ? false : <button className={state.artist === true ? styles.buttonStyles : styles.buttonOff} name='artist' onClick={(e) => changingState(e)}>Artist</button>}
        {musicSearch.length === 0 ? false : <button className={styles.buttonStyles} name='reset' onClick={() => onClickResetFilters()}>Reset filters</button>}
      </div>


      <div className={state.tracks === false ? styles.containerAlbumes : styles.containerAlbumes2} >
        {musicSearch.length === 0 ? <h1 className={styles.titleGenre}>Top Tracks</h1> : <h1 className={styles.titleGenre}>Tracks</h1>}
        <Swiper
          // className={styles.swiper}
          // spaceBetween={-70}
          slidesPerView={5}
          slidesPerGroup={3}
          loop={false}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          // Responsive breakpoints
          breakpoints={{
            // when window width is >= 220px
            220: {
              slidesPerView: 1,
              // spaceBetween: -20
            },
            // when window width is >= 320px
            380: {
              slidesPerView: 2,
              // spaceBetween: 10
            },
            // when window width is >= 480px
            600: {
              slidesPerView: 3,
              // spaceBetween: 15
            },
            // when window width is >= 640px
            900: {
              slidesPerView: 4,
              // spaceBetween: 25
            },
            // when window width is >= 800px
            1200: {
              slidesPerView: 5,
              // spaceBetween: -40
            },
          }}
        >
          <div>
            {musicSearch.length === 0 ? topMusic.apiTracks?.map((item) => {
              return (
                <SwiperSlide className={styles.containerSwiper} key={item.id}>
                  <Link to={`/${item.id}`}>
                    <img
                      className={styles.imgSwiper}
                      src={item.images}
                      alt={item.name}
                    />
                    <h3 className={styles.h3Colors}>{item.name}</h3>
                    <h3 className={styles.h3Colors}>{item.artistName}</h3>
                  </Link>
                </SwiperSlide>
              )
            })
              : musicSearch.tracks?.map((item) => {
                return (
                  <SwiperSlide className={styles.containerSwiper} key={item.id}>
                    <Link to={`/${item.id}`}>
                      <img
                        className={styles.imgSwiper}
                        src={item.image}
                        alt={item.name}
                        onError={onImgError}
                      />
                      <h3 className={styles.h3Colors}>{item.name}</h3>
                      <h3 className={styles.h3Colors}>{item.artistName}</h3>
                    </Link>
                  </SwiperSlide>
                )
              })}
          </div>
        </Swiper>
      </div>

      <div className={state.albums === false ? styles.containerAlbumes : styles.containerAlbumes2}>
        <h1 className={styles.titleGenre}>Top Albums</h1>
        <Swiper
          // className={styles.swiper}
          // spaceBetween={-70}
          slidesPerView={5}
          slidesPerGroup={3}
          loop={false}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          // Responsive breakpoints
          breakpoints={{
            // when window width is >= 220px
            220: {
              slidesPerView: 1,
              // spaceBetween: -20
            },
            // when window width is >= 320px
            380: {
              slidesPerView: 2,
              // spaceBetween: 10
            },
            // when window width is >= 480px
            600: {
              slidesPerView: 3,
              // spaceBetween: 15
            },
            // when window width is >= 640px
            900: {
              slidesPerView: 4,
              // spaceBetween: 25
            },
            // when window width is >= 800px
            1200: {
              slidesPerView: 5,
              // spaceBetween: -40
            },
          }}
        >
          <div>
            {musicSearch.length === 0 ? topMusic.apiAlbums?.map((item) => {
              return (
                <SwiperSlide className={styles.containerSwiper} key={item.id}>
                  <Link to={`/${item.id}`}>
                    <img
                      className={styles.imgSwiper}
                      src={item.images}
                      alt={item.name}
                    />
                    <h3 className={styles.h3Colors}>{item.name}</h3>
                    <h3 className={styles.h3Colors}>{item.artistName}</h3>
                  </Link>
                </SwiperSlide>
              );
            })
              : musicSearch.albums?.map((item) => {
                return (
                  <SwiperSlide className={styles.containerSwiper} key={item.id}>
                    <Link to={`/${item.id}`}>
                      <img
                        className={styles.imgSwiper}
                        src={item.images}
                        alt={item.name}
                        onError={onImgError}
                      />
                      <h3 className={styles.h3Colors}>{item.name}</h3>
                      <h3 className={styles.h3Colors}>{item.artistName}</h3>
                    </Link>
                  </SwiperSlide>
                );
              })}
          </div>
        </Swiper>
      </div>


      <div className={state.artist === false ? styles.containerAlbumes : styles.containerAlbumes2}>
        <h1 className={styles.titleGenre}>Top Artists</h1>
        <Swiper
          // className={styles.swiper}
          // spaceBetween={-70}
          slidesPerView={5}
          slidesPerGroup={3}
          loop={false}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          // Responsive breakpoints
          breakpoints={{
            // when window width is >= 220px
            220: {
              slidesPerView: 1,
              // spaceBetween: -20
            },
            // when window width is >= 320px
            380: {
              slidesPerView: 2,
              // spaceBetween: 10
            },
            // when window width is >= 480px
            600: {
              slidesPerView: 3,
              // spaceBetween: 15
            },
            // when window width is >= 640px
            900: {
              slidesPerView: 4,
              // spaceBetween: 25
            },
            // when window width is >= 800px
            1200: {
              slidesPerView: 5,
              // spaceBetween: -40
            },
          }}
        >
          <div>
            {musicSearch.length === 0 ? topMusic.apiArtists?.map((item) => {
              return (
                <SwiperSlide className={styles.containerSwiper} key={item.id}>
                  <Link to={`/${item.id}`}>
                    <img
                      className={styles.imgSwiper}
                      src={item.images}
                      alt={item.name}
                    />
                    <h3 className={styles.h3Colors}>{item.name}</h3>
                    <h3 className={styles.h3Colors}>{item.shortcut}</h3>
                  </Link>
                </SwiperSlide>
              );
            })
              : musicSearch.artists?.map((item) => {
                return (
                  <SwiperSlide className={styles.containerSwiper} key={item.id}>
                    <Link to={`/${item.id}`}>
                      <img
                        className={styles.imgSwiper}
                        src={item.images}
                        alt={item.name}
                        onError={onImgError}
                      />
                      <h3 className={styles.h3Colors}>{item.name}</h3>
                      <h3 className={styles.h3Colors}>{item.artistName}</h3>
                    </Link>
                  </SwiperSlide>
                );
              })}
          </div>
        </Swiper>
      </div>

      <div className={state.playlist === false ? styles.containerAlbumes : styles.containerAlbumes2}>
        <h1 className={styles.titleGenre}>Top Playlists</h1>
        <Swiper
          // className={styles.swiper}
          // spaceBetween={-70}
          slidesPerView={5}
          slidesPerGroup={3}
          loop={false}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          // Responsive breakpoints
          breakpoints={{
            // when window width is >= 220px
            220: {
              slidesPerView: 1,
              // spaceBetween: -20
            },
            // when window width is >= 320px
            380: {
              slidesPerView: 2,
              // spaceBetween: 10
            },
            // when window width is >= 480px
            600: {
              slidesPerView: 3,
              // spaceBetween: 15
            },
            // when window width is >= 640px
            900: {
              slidesPerView: 4,
              // spaceBetween: 25
            },
            // when window width is >= 800px
            1200: {
              slidesPerView: 5,
              // spaceBetween: -40
            },
          }}
        >
          <div>
            {musicSearch.length === 0 ? topMusic.apiPlaylists?.map((item) => {
              return (
                <SwiperSlide className={styles.containerSwiper} key={item.id}>
                  <Link to={`/${item.id}`}>
                    <img
                      className={styles.imgSwiper}
                      src={item.images}
                      alt={item.name}
                    />
                    <h3 className={styles.h3Colors}>{item.name}</h3>
                  </Link>
                </SwiperSlide>
              );
            })
              : musicSearch.playlists?.map((item) => {
                return (
                  <SwiperSlide className={styles.containerSwiper} key={item.id}>
                    <Link to={`/${item.id}`}>
                      <img
                        className={styles.imgSwiper}
                        src={item.images}
                        alt={item.name}
                        onError={onImgError}
                      />
                      <h3 className={styles.h3Colors}>{item.name}</h3>
                    </Link>
                  </SwiperSlide>
                );
              })}
          </div>
        </Swiper>
      </div>
    </div>
  );

}

