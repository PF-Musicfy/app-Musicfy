import { useState } from "react";
import { FaStar } from "react-icons/fa";
import s from "./feedback.module.css";
import axios from "axios";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

export default function Feedback() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0) // === [0,0,0,0,0]

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
    </div>
  )
}
