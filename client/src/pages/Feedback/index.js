import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import s from "./feedback.module.css";
import { getFeedback } from "../../store/slice/user.js";
import NavBarLandingOn from "../../components/LandingPage/NavBarLandingOn";
import Footer from "../../components/LandingPage/Footer";
import NavBarLandingOff from "../../components/LandingPage/NavBarLandingOff";
import { CardsFeedback } from "../../components/CardsFeedback";

export default function Feedback() {
  const dispatch = useDispatch();
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
      {Object.keys(user).length? <NavBarLandingOn /> : <NavBarLandingOff />}
      <div className={s.feedbackContainer}>
        <p className={s.feedbackTitle}>
          Feedback Musicfy
        </p>
        {Object.keys(user).length ?
          <form className={s.feedbackForm} onSubmit={submit}>
            <p>Post a new comment</p>
            <textarea
              placeholder="Description"
              className={s.feedbackTextarea}
            />
            <div className={s.feedbackSubmit}>
              <button className={s.feedbackButton}>
                Submit
              </button>
            </div>
          </form>
        : 'logeate'}
        <CardsFeedback />
      </div>
      <Footer />
    </div>
  )
}
