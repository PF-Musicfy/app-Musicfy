import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import s from "./feedback.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "../../store/slice/user.js";
import NavBarLanding from "../../components/LandingPage/NavBarLanding";
import Footer from "../../components/LandingPage/Footer";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

export default function Feedback() {
  const dispatch = useDispatch();
  const { feedback, user } = useSelector((state) => state.user);

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0) // === [0,0,0,0,0]

  useEffect(() => {
    dispatch(getFeedback())
  },[dispatch])

  const submit = (e) => {
    e.preventDefault();
    if(!e.target[0].value || !e.target[1].value){
      alert(`puntos: ${currentValue} stars\n`+
      `campos no pueden estar vacios`);
      return;
    }
    axios.post("http://localhost:5000/feedback", {
      username: user.username,
      title: e.target[0].value,
      description: e.target[1].value,
    })
    .then(() => {
      dispatch(getFeedback())
      alert("post feedback "+user.username);
      e.target[0].value = '';
      e.target[1].value = '';
    })
    .catch((error) => {
      alert(`puntos: ${currentValue} stars\n`+
      `input 1: ${e.target[0].value}\n`+
      `textarea: ${e.target[1].value}`);
      console.log(error);
    });
  }

  return (
    <div>
      <NavBarLanding />
      <div className={s.feedbackContainer}>
      <p
        className={s.feedbackTitle}
      >
        Feedback Musicfy
      </p>
      {Object.keys(user).length ?
      <form className={s.feedbackForm} onSubmit={submit}>
        <p>Post a new comment</p>
        <input
          type="text"
          placeholder="Title"
        />
        <textarea
          placeholder="Description"
          className={s.feedbackTextarea}
        />
        <div className={s.feedbackSubmit}>
          <div className={s.feedbackStars}>
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={24}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 10,
                  cursor: "pointer"
                }}
                onClick={() => setCurrentValue(index + 1)}
                onMouseOver={() => setHoverValue(index + 1)}
                onMouseLeave={() => setHoverValue(undefined)}
              />
            ))}
          </div>
          <button
            className={s.feedbackButton}
          >
            Submit
          </button>
        </div>
      </form>
      : 'logeate'}
      <div className={s.feedbackComments}>
        {feedback.map((e) => (
          <div
            key={e._id}
            className={s.feedbackComment}
          >
            <div
              className={s.feedbackAvatar}
            >
              <img src={e.avatar} alt='' />
              <div>
                <p>username: {e.username}</p>
              </div>
            </div>
            <p>date: {e.date}</p>
            <p>plan: {e.plan}</p>
            <p>title: {e.title}</p>
            <p>description: {e.description}</p>
          </div>
        ))}
      </div>
      </div>
      <Footer />
    </div>
  )
}
// july 31, 2022 06:56
