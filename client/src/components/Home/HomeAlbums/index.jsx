// Import Swiper React components
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { albumData, albumData2 } from './dataTest';
import styles from './indexHome.module.css'
import 'swiper/css/navigation';
import axios from 'axios';


// Import Swiper styles
import 'swiper/css';

// const getInfoApi = async () => {
//     try {
//         const results = await ((await axios.get("https://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4")).data.tracks)
//         console.log(results)
//         const mapeandoData = results.map((item) => {
//             console.log(item.links.albums.href)
//         })
//         return mapeandoData
//     } catch (error) {
//         console.log(error)
//     }
// }

// getInfoApi()



export default function HomeAlbum() {

    return (
        <div className={styles.albumSuperiorContainer}>
            <h1 className={styles.titleGenre}>Album Unknown</h1>
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
                    }
                }}

            >

                <div>
                    {albumData2.map((item) => {
                        return (
                            <SwiperSlide className={styles.containerSwiper} key={item.id}>
                                <img className={styles.imgSwiper} src={item.img} alt={item.title} />
                                <h3 className={styles.h3Colors}>{item.title}</h3>
                                <h3 className={styles.h3Colors}>{item.artist}</h3>
                            </SwiperSlide>
                        );
                    })}
                </div>


            </Swiper>
            
            <h1 className={styles.titleGenre}>Album Unknown</h1>
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
                    }
                }}

            >

                <div>
                    {albumData.map((item) => {
                        return (
                            <SwiperSlide className={styles.containerSwiper} key={item.id}>
                                <img className={styles.imgSwiper} src={item.img} alt={item.title} />
                                <h3 className={styles.h3Colors}>{item.title}</h3>
                                <h3 className={styles.h3Colors}>{item.artist}</h3>
                            </SwiperSlide>
                        );
                    })}
                </div>


            </Swiper>
        </div>
    );
}