// Import Swiper React components
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./indexHome.module.css";
import "swiper/css/navigation";
import {
  getTopMusic,
  topMusicClear,
  getTopsByGenre,
} from "../../../store/slice/index";
import { Link } from "react-router-dom";

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
  });

  // console.log(topMusic);
  // console.log(musicSearch);

  const changingState = (e) => {
    e.preventDefault();

    setState({
      tracks: e.target.name === "tracks" ? true : false,
      albums: e.target.name === "albums" ? true : false,
      playlist: e.target.name === "playlist" ? true : false,
      artist: e.target.name === "artist" ? true : false,
    });
  };

  // Kosovomba

  const [combFilter, setCombFilter] = useState({
    genre: ["Choose genre", ""],
    tops: "Choose option",
  });

  const genreOptions = [
    ["Choose genre", ""],
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
    ["Metal", "g.394"],
  ];
  let genreOption = [];

  function handleChangeGenre(e) {
    e.preventDefault();
    genreOption = genreOptions.filter((g) => g[0] === e.target.value);
    setCombFilter({ ...combFilter, genre: genreOption[0] });
    console.log(combFilter);
  }

  function handleChangeTops(e) {
    e.preventDefault();
    setCombFilter({ ...combFilter, tops: e.target.value });
  }

  const handleCombFilter = (e) => {
    e.preventDefault();
    dispatch(getTopsByGenre(combFilter));
    // setCombFilter({genre: ['Choose genre', ''], tops: 'Choose option'})
  };

  // Kosovomba

  const onClickResetFilters = () => {
    setState({
      tracks: true,
      albums: true,
      playlist: true,
      artist: true,
    });
  };

  useEffect(() => {
    if (topMusic.length === 0){
    dispatch(getTopMusic())
    };
  }, []);

  useEffect(() => {
    if (musicSearch.length !== 0) {
    dispatch(topMusicClear())
    }
  }, [musicSearch])

  const onImgError = (e) => {
    e.target.src =
      "https://pixabay.com/es/images/download/icon-1968245_640.png";
  };

  return (
    <div className={styles.albumSuperiorContainer}>
      <div className={styles.buttonsFilter}>
        {
          <button
            className={
              state.tracks === true ? styles.buttonStyles : styles.buttonOff
            }
            name="tracks"
            onClick={(e) => changingState(e)}
          >
            Tracks
          </button>
        }
        {
          <button
            className={
              state.albums === true ? styles.buttonStyles : styles.buttonOff
            }
            name="albums"
            onClick={(e) => changingState(e)}
          >
            Albums
          </button>
        }
        {
          <button
            className={
              state.playlist === true ? styles.buttonStyles : styles.buttonOff
            }
            name="playlist"
            onClick={(e) => changingState(e)}
          >
            Playlist
          </button>
        }
        {
          <button
            className={
              state.artist === true ? styles.buttonStyles : styles.buttonOff
            }
            name="artist"
            onClick={(e) => changingState(e)}
          >
            Artist
          </button>
        }
        {
          <button
            className={styles.buttonStyles}
            name="reset"
            onClick={() => onClickResetFilters()}
          >
            Reset filters
          </button>
        }
      </div>

      {/* Kosovomba */}

      <div className={styles.buttonsFilterSelect}>
        <span>Tops by genre: </span>
        <select
          name="genre"
          className={styles.selectorFilter}
          onChange={handleChangeGenre}
          value={combFilter.genre[0]}
        >
          {/* <option>Choose genre</option> */}
          {genreOptions.map((g) => {
            return (
              <option key={g[0]} value={g[0]}>
                {g[0]}
              </option>
            );
          })}
        </select>
        <select
          className={styles.selectorFilter}
          name="tops"
          onChange={handleChangeTops}
          value={combFilter.tops}
        >
          <option>Choose option</option>
          <option>Tracks</option>
          <option>Albums</option>
          <option>Artists</option>
          <option>Playlists</option>
        </select>
        <button
          onClick={(e) => handleCombFilter(e)}
          disabled={
            combFilter.genre[0] === "Choose genre"
              ? true
              : combFilter.tops === "Choose option"
              ? true
              : false
          }
          className={styles.btnSearch}
        >
          Search
        </button>
      </div>

      {/* Kosovomba */}

      <div
        className={
          state.tracks === false
            ? styles.containerAlbumes
            : styles.containerAlbumes2
        }
      >
        {musicSearch.length === 0 ? (
          <h1 className={styles.titleGenre}>Top Tracks</h1>
        ) : (
          <h1 className={styles.titleGenre}>Tracks</h1>
        )}
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
            {musicSearch.length === 0
              ? topMusic.apiTracks?.map((item) => {
                  return (
                    <SwiperSlide
                      className={styles.containerSwiper}
                      key={item.id}
                    >
                      <Link to={`/home/${item.id}`}>
                        <img
                          className={styles.imgSwiper}
                          src={item.images || item.image}
                          alt={item.name}
                          onError={onImgError}
                        />
                        <h3 className={styles.h3Colors}>{item.name}</h3>
                        <h3 className={styles.h3Colors}>{item.artistName}</h3>
                      </Link>
                    </SwiperSlide>
                  );
                })
              : musicSearch.tracks?.map((item) => {
                  return (
                    <SwiperSlide
                      className={styles.containerSwiper}
                      key={item.id}
                    >
                      <Link to={`/home/${item.id}`}>
                        <img
                          className={styles.imgSwiper}
                          src={item.image || item.images}
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


      <div
        className={
          state.albums === false
            ? styles.containerAlbumes
            : styles.containerAlbumes2
        }
      >
        {musicSearch.length === 0 ? (
          <h1 className={styles.titleGenre}>Top Albums</h1>
        ) : (
          <h1 className={styles.titleGenre}>Albums</h1>
        )}

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
            {musicSearch.length === 0
              ? topMusic.apiAlbums?.map((item) => {
                  return (
                    <SwiperSlide
                      className={styles.containerSwiper}
                      key={item.id}
                    >
                      <Link to={`/home/${item.id}`}>
                        <img
                          className={styles.imgSwiper}
                          src={item.image || item.images}
                          alt={item.name}
                          onError={onImgError}
                        />
                        <h3 className={styles.h3Colors}>{item.name}</h3>
                        <h3 className={styles.h3Colors}>{item.artistName}</h3>
                      </Link>
                    </SwiperSlide>
                  );
                })
              : musicSearch.albums?.map((item) => {
                  return (
                    <SwiperSlide
                      className={styles.containerSwiper}
                      key={item.id}
                    >
                      <Link to={`/home/${item.id}`}>
                        <img
                          className={styles.imgSwiper}
                          src={item.image || item.images}
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


      <div
        className={
          state.artist === false
            ? styles.containerAlbumes
            : styles.containerAlbumes2
        }
      >
        {musicSearch.length === 0 ? (
          <h1 className={styles.titleGenre}>Top Artists</h1>
        ) : (
          <h1 className={styles.titleGenre}>Artists</h1>
        )}

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
            {musicSearch.length === 0
              ? topMusic.apiArtists?.map((item) => {
                  return (
                    <SwiperSlide
                      className={styles.containerSwiper}
                      key={item.id}
                    >
                      <Link to={`/home/${item.id}`}>
                        <img
                          className={styles.imgSwiper}
                          src={item.image || item.images}
                          alt={item.name}
                          onError={onImgError}
                        />
                        <h3 className={styles.h3Colors}>{item.name}</h3>
                      </Link>
                    </SwiperSlide>
                  );
                })
              : musicSearch.artists?.map((item) => {
                  return (
                    <SwiperSlide
                      className={styles.containerSwiper}
                      key={item.id}
                    >
                      <Link to={`/home/${item.id}`}>
                        <img
                          className={styles.imgSwiper}
                          src={item.image || item.images}
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


      <div
        className={
          state.playlist === false
            ? styles.containerAlbumes
            : styles.containerAlbumes2
        }
      >
        {musicSearch.length === 0 ? (
          <h1 className={styles.titleGenre}>Top Playlist</h1>
        ) : (
          <h1 className={styles.titleGenre}>Playlist</h1>
        )}

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
            {musicSearch.length === 0
              ? topMusic.apiPlaylists?.map((item) => {
                  return (
                    <SwiperSlide
                      className={styles.containerSwiper}
                      key={item.id}
                    >
                      <Link to={`/home/${item.id}`}>
                        <img
                          className={styles.imgSwiper}
                          src={item.image || item.images}
                          alt={item.name}
                          onError={onImgError}
                        />
                        <h3 className={styles.h3Colors}>{item.name}</h3>
                      </Link>
                    </SwiperSlide>
                  );
                })
              : musicSearch.playlists?.map((item) => {
                  return (
                    <SwiperSlide
                      className={styles.containerSwiper}
                      key={item.id}
                    >
                      <Link to={`/home/${item.id}`}>
                        <img
                          className={styles.imgSwiper}
                          src={item.image || item.images}
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
