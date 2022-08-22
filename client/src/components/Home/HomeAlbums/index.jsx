// Import Swiper React components
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./indexHome.module.css";
import "swiper/css/navigation";
import { getTopMusic } from "../../../store/slice/index";
import { Link} from "react-router-dom"

// Import Swiper styles
import "swiper/css";

export default function HomeAlbum() {
  const dispatch = useDispatch();
  const { topMusic } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(getTopMusic());
  }, [dispatch]);

  return (
    <div className={styles.albumSuperiorContainer}>

         <h1 className={styles.titleGenre}>Top Tracks</h1>

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
          {topMusic.apiTracks?.map((item) => {
            return (
              <SwiperSlide className={styles.containerSwiper} key={item.id}>
                <Link to= {`/home/${item.id}`}>
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
          })}
        </div>
      </Swiper>

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
          {topMusic.apiAlbums?.map((item) => {
            return (
              <SwiperSlide className={styles.containerSwiper} key={item.id}>
                <Link to= {`/home/${item.id}`}>
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
          })}
        </div>
      </Swiper>

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
          {topMusic.apiArtists?.map((item) => {
            return (
              <SwiperSlide className={styles.containerSwiper} key={item.id}>
                <Link to= {`/home/${item.id}`}>
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
          })}
        </div>
      </Swiper>

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
          {topMusic.apiPlaylists?.map((item) => {
            return (
              <SwiperSlide className={styles.containerSwiper} key={item.id}>
                <Link to= {`/home/${item.id}`}>
                <img
                  className={styles.imgSwiper}
                  src={item.images}
                  alt={item.name}
                />
                <h3 className={styles.h3Colors}>{item.name}</h3>
                </Link>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>

      <h1 className={styles.titleGenre}>Top Stations</h1>

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
          {topMusic.apiStations?.map((item) => {
            return (
              <SwiperSlide className={styles.containerSwiper} key={item.id}>
                <Link to= {`/home/${item.id}`}>
                <img
                  className={styles.imgSwiper}
                  src={item.images}
                  alt={item.name}
                />
                <h3 className={styles.h3Colors}>{item.name}</h3>
                <h3 className={styles.h3Colors}>{item.artists}</h3>
                </Link>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );

}

