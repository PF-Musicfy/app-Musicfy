import React from 'react'
import s from './profile.module.css'
import avatar from './utilsIMG/bsines.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom"
import { useEffect } from 'react';
import { getTopMusic } from '../../store/slice';


// import Orders from './Orders'
// import Shopping from './Shopping'


function ProfileInfo() {
    const dispatch = useDispatch();
    const { topMusic } = useSelector((state) => state.music);

    useEffect(() => {
        dispatch(getTopMusic());
    }, []);

    return (
        <div className={s.mainContainer}>

            {/* ------ START Center Information ------ */}
            <section className={s.centerContainer}>
                <p className={s.premiumNormal}>Cambiar Plan</p>

                <div className={s.navbarCenter}>
                    <div className={s.circleImage}>
                        <img className={s.insideCircle} src={avatar} alt='avatar' />
                    </div>

                    <div className={s.infoNavbar}>
                        <h2 className={s.h2Perfil}>Perfil</h2>
                        <span>
                            <h1 className={s.h1UserName}>Unknown</h1>
                        </span>
                        {true ? <p className={s.underUsername}> Eres premium</p> : false}
                    </div>
                </div>

                <section className={s.centerInfoContainer}>
                    <div className={s.carousel1}>
                        <h1 className={s.titleGenre}>Top Playlists</h1>
                        <Swiper
                            className={s.swiper}
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
                                        <SwiperSlide className={s.containerSwiper} key={item.id}>
                                            <Link to={`/home/${item.id}`}>
                                                <img
                                                    className={s.imgSwiper}
                                                    src={item.images}
                                                    alt={item.name}
                                                />
                                                <h3 className={s.h3Colors}>{item.name}</h3>
                                            </Link>
                                        </SwiperSlide>
                                    );
                                })}
                            </div>
                        </Swiper>
                    </div>

                    {/* Another carousel2 to put more info in perfil */}

                    <div className={s.carousel2}>
                        <h1 className={s.titleGenre2}>Albums</h1>
                        <Swiper
                            className={s.swiper}
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
                                        <SwiperSlide className={s.containerSwiper2} key={item.id}>
                                            <Link to={`/home/${item.id}`}>
                                                <img
                                                    className={s.imgSwiper}
                                                    src={item.images}
                                                    alt={item.name}
                                                />
                                                <h3 className={s.h3Colors2}>{item.name}</h3>
                                                <h3 className={s.h3artistName}>{item.artistName}</h3>
                                            </Link>
                                        </SwiperSlide>
                                    );
                                })}
                            </div>
                        </Swiper>
                    </div>
                </section>
            </section>
            {/* ------ END Center Information ------ */}

        </div>
    )
}

export default ProfileInfo