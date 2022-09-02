import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import s from "./feedback.module.css";
import { getFeedback } from "../../store/slice/user.js";
import NavBarLandingOn from "../../components/LandingPage/NavBarLandingOn";
import Footer from "../../components/LandingPage/Footer";
import NavBarLandingOff from "../../components/LandingPage/NavBarLandingOff";
import { CardsFeedback } from "../../components/CardsFeedback";
import { useLoading } from "../../hooks/useLoading.js";
import Loading from "../../components/Loading";

export default function Feedback() {
  const dispatch = useDispatch();
  const { display, loading } = useLoading();
  const { user } = useSelector((state) => state.user);

  const submit = (e) => {
    e.preventDefault();
    if(!e.target[0].value){
      alert(`campos no pueden estar vacios`);
      return;
    }
    axios.post("http://localhost:5000/feedback", {
      description: e.target[0].value,
    })
    .then(() => {
      dispatch(getFeedback())
      alert("post feedback ");
      e.target[0].value = '';
    })
    .catch((error) => {
      alert(`area: ${e.target[0].value}`)
      console.log(error);
    });
  }

  return (
    <div>
    {Object.keys(user).length ?
      <>
      {Object.keys(user).length? <NavBarLandingOn /> : <NavBarLandingOff />}
      <div className={s.feedbackContainer}>
        <p className={s.feedbackTitle}>
          Feedback Musicfy
        </p>
        <div className={s.content}>
          {Object.keys(user).length ?
            <form className={s.feedbackForm} onSubmit={submit}>
              <p>Post a new comment</p>
              <textarea
                rows="4" wrap="hard" maxLength="150"
                placeholder="Description"
                className={s.feedbackTextarea}
              />
              <div className={s.feedbackSubmit}>
                <button className={s.feedbackButton}>
                  Submit
                </button>
              </div>
            </form>
          : 'logeate'
          }
          <CardsFeedback />
        </div>
      </div>
      <Footer />
      </>
    : loading ? 
      <Loading text={loading} /> :
      <div style={{display}}>
      {Object.keys(user).length? <NavBarLandingOn /> : <NavBarLandingOff />}
      <div className={s.feedbackContainer}>
        <p className={s.feedbackTitle}>
          Feedback Musicfy
        </p>
        <div className={s.content}>
          <div className={s.card}>
            Debes <Link to='/login' style={{color: '#00f'}}>iniciar sesion</Link> con
            una cuenta activa para publicar comentarios.
          </div>
          <CardsFeedback />
        </div>
      </div>
      <Footer />
      </div>
    }
    </div>
  )
}
