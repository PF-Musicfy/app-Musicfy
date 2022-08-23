import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import s from "./feedback.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "../../store/slice";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

export default function Feedback() {
  const dispatch = useDispatch();
  const postsFeedback = useSelector((state) => state.music.feedback);

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0) // === [0,0,0,0,0]

  useEffect(() => {
    dispatch(getFeedback())
  },[dispatch])

  const click = (value) => {
    setCurrentValue(value)
  }

  const mouseOver = (value) => {
    setHoverValue(value)
  };

  const mouseLeave = () => {
    setHoverValue(undefined)
  }

  const submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/feedback", {
      title: e.target[0].value,
      description: e.target[2].value,
    })
    .then(() => {
      dispatch(getFeedback())
      alert("post feedback");
    })
    .catch((error) => {
      alert(`puntos: ${currentValue} stars\n`+
      `input 1: ${e.target[0].value}\n`+
      `input 2: ${e.target[1].value}\n`+
      `textarea: ${e.target[2].value}`);
      console.log(error);
    });
  }

  return (
    <div className={s.feedbackContainer}>
      <h2>Feedback Musicfy</h2>
      <form className={s.feedbackContainer} onSubmit={submit}>
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
              onClick={() => click(index + 1)}
              onMouseOver={() => mouseOver(index + 1)}
              onMouseLeave={mouseLeave}
            />
          ))}
        </div>
        <p>Pregunta 1</p>
        <input
          type="text"
          placeholder="What's your experience?"
        />
        <p>Pregunta 2</p>
        <input
          type="text"
          placeholder="What's your experience?"
        />
        <textarea
          placeholder="What's your experience?"
          className={s.feedbackTextarea}
        />

        <button
          className={s.feedbackButton}
        >
          Submit
        </button>
      </form>
      <div>
        {postsFeedback.map((e) => (
          <div key={e._id}>
            <p>id: {e._id}</p>
            <p>title: {e.title}</p>
            <p>description: {e.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
