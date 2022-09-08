import React, { useState } from "react";
import s from "./profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getTopMusic } from "../../store/slice";
import Avatar from "../Avatar";
import { CgCloseO } from "react-icons/cg";
import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import Swal from "sweetalert2";
import { logoutUser } from "store/slice/user";
import axios from "axios";
import UserMP3 from "../UserMP3";

function ProfileInfo() {
  const dispatch = useDispatch();
  const { topMusic } = useSelector((state) => state.music);
  const { user } = useSelector((state) => state.user); //aqui tienes la info del usuario
  const { avatar } = useSelector((state) => state.music);
  const [modal, setModal] = useState(false);
  const [modalMp3, setModalMp3] = useState(false);
  const theme = localStorage.getItem("theme");
  const navigate = useNavigate();

  console.log(user.usermp3);

  function deleteAccount() {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        },
        // buttonsStyling: false
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#666",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your account has been deleted.",
              "success"
            );
            axios
              .post(`${axios.defaults.baseURL}/user/changeblock`, {
                id: user._id,
              })
              .then(() => {
                dispatch(logoutUser());
                navigate("/");
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your account is safe :)",
              "error"
            );
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleMp3 = () => {
    setModalMp3(!modalMp3);
  };

  useEffect(() => {
    if (avatar.length > 0) {
      dispatch(getTopMusic());
    }
    dispatch(getTopMusic());
  }, [dispatch, avatar]);

  const onImgError = (e) => {
    e.target.src =
      "https://pixabay.com/es/images/download/icon-1968245_640.png";
  };

  return (
    <>
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}

      <div
        className={theme === "light" ? s.mainContainerLight : s.mainContainer}
      >
        {/* MODAL AVATAR */}
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
        {/* MODAL MP3 */}
        {modalMp3 && (
          <div>
            <CgCloseO
              className={s.buttonCloseModal}
              onClick={() => setModalMp3(!modalMp3)}
            />
            <div className={s.containerModal}>
              <UserMP3 />
            </div>
          </div>
        )}
        {/* ------ START Center Information ------ */}
        <section
          className={
            theme === "light"
              ? modal === false && modalMp3 === false
                ? s.centerContainerLight
                : s.centerContainerDisplay
              : modal === false && modalMp3 === false
              ? s.centerContainer
              : s.centerContainerDisplay
          }
        >
          <div className={s.navbarCenter}>
            <div onClick={() => toggleModal()} className={s.circleImage}>
              {/* <h1 className={s.editImage}>editame boludo</h1> */}
              <img className={s.insideCircle} src={user.avatar} alt="avatar" />
            </div>
            <div className={s.infoNavbar}>
              <h2 className={s.h2Perfil}>Profile</h2>
              <span>
                <h1 className={s.h1UserName}>{user.username}</h1>
              </span>
              {user.premium === true ? (
                <p className={s.underUsername}>Premium</p>
              ) : (
                <p className={s.underUsername}>Free</p>
              )}
            </div>
            <div className={s.buttonsDeleteMp3}>
              <button onClick={() => deleteAccount()} className={s.btnDelete}>
                <p className={s.pDelete}>Delete Account</p>
              </button>
              <button onClick={() => toggleMp3()} className={s.btnMp3}>
                <p className={s.pMp3}>Upload Mp3</p>
              </button>
            </div>
          </div>

          <section className={s.centerInfoContainer}>
            <div className={s.carousel1}>
              <h1 className={s.titleGenre}>Top Playlists</h1>
              <Swiper
                className={s.swiper}
                // spaceBetween={-70}
                slidesPerView={5}
                slidesPerGroup={1}
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
                  375: {
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
                slidesPerGroup={1}
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
                  375: {
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
