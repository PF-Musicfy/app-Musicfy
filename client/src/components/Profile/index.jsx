import React, { useState } from "react";
import s from "./profile.module.css";
// import avatar from './utilsIMG/bsines.jpeg';
import { useSelector, useDispatch } from "react-redux";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTopMusic } from "../../store/slice";
import Avatar from "../Avatar";
import { CgCloseO } from "react-icons/cg";
import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
// import Orders from './Orders'
// import Shopping from './Shopping'

function ProfileInfo() {
  const dispatch = useDispatch();
  const { topMusic } = useSelector((state) => state.music);
  const { user } = useSelector((state) => state.user); //aqui tienes la info del usuario
  const { avatar } = useSelector((state) => state.music);
  console.log(avatar);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (avatar.length > 0) {
      dispatch(getTopMusic());
    }
    dispatch(getTopMusic());
  }, [dispatch, avatar]);

  const onImgError = (e) => {
    e.target.src = "https://pixabay.com/es/images/download/icon-1968245_640.png";
  }

  return (
    <>
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}

      <div className={s.mainContainer}>
        {modal && (
          <div className={s.mainContainerModal}>
            <CgCloseO
              className={s.buttonCloseModal}
              onClick={() => setModal(!modal)}
            />
            <div className={s.containerModal}>
              <Avatar />
            </div>
          </div>
        )}
        {/* ------ START Center Information ------ */}
        <section
          className={
            modal === false ? s.centerContainer : s.centerContainerDisplay
          }
        >
          
          <div className={s.navbarCenter}>
            <div onClick={() => toggleModal()} className={s.circleImage}>
              {/* <h1 className={s.editImage}>editame boludo</h1> */}
              <img className={s.insideCircle} src={user.avatar} alt="avatar" />
            </div>
            <div className={s.infoNavbar}>
              <h2 className={s.h2Perfil}>Perfil</h2>
              <span>
                <h1 className={s.h1UserName}>{user.username}</h1>
              </span>
              {user.premium === true ? (
                <p className={s.underUsername}>Premium</p>
              ) : (
                <p className={s.underUsername}>Free</p>
              )}
            </div>
          </div>

          <section className={s.centerInfoContainer}>
            <div className={s.carousel1}>
              <h1 className={s.titleGenre}>Top Playlists</h1>
              <Swiper
                className={s.swiper}
                // spaceBetween={-70}
                slidesPerView={5}
                slidesPerGroup={2}
                loop={false}
                loopFillGroupWithBlank={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                // Responsive breakpoints
                breakpoints={{
                  // when window width is >= 320px
                  410: {
                    slidesPerView: 1,
                    // spaceBetween: -20
                  },
                  // when window width is >= 455px
                  455: {
                    slidesPerView: 2,
                    // spaceBetween: -20
                  },
                  // when window width is >= 320px
                  580: {
                    slidesPerView: 3,
                    // spaceBetween: 10
                  },
                  // when window width is >= 480px
                  780: {
                    slidesPerView: 3,
                    // spaceBetween: 15
                  },
                  // when window width is >= 640px
                  1015: {
                    slidesPerView: 4,
                    // spaceBetween: 25
                  },
                  // when window width is >= 800px
                  1230: {
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
                            src={item.images || item.image}
                            alt={item.name}
                            onError={onImgError}
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
                slidesPerGroup={2}
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
                  410: {
                    slidesPerView: 1,
                    // spaceBetween: -20
                  },
                  // when window width is >= 455px
                  455: {
                    slidesPerView: 2,
                    // spaceBetween: -20
                  },
                  // when window width is >= 320px
                  580: {
                    slidesPerView: 3,
                    // spaceBetween: 10
                  },
                  // when window width is >= 480px
                  780: {
                    slidesPerView: 3,
                    // spaceBetween: 15
                  },
                  // when window width is >= 640px
                  1015: {
                    slidesPerView: 4,
                    // spaceBetween: 25
                  },
                  // when window width is >= 800px
                  1230: {
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
                            onError={onImgError}
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
    </>
  );
}

export default ProfileInfo;
