import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./feedback.css";

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

  const mouseHover = (value) => {
    setHoverValue(value)
  };

  const mouseLeave = () => {
    setHoverValue(undefined)
  }

  const submit = (e) => {
    e.preventDefault();
    alert(`textarea: ${e.target[0].value}`);
  }

  return (
    <div className="feedback-container">
      <h2>Feedback Musicfy</h2>
      <form className="feedback-container" onSubmit={submit}>
      <div className="feedback-stars">
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
            onMouseOver={() => mouseHover(index + 1)}
            onMouseLeave={mouseLeave}
          />
        ))}
      </div>
      <textarea
        placeholder="What's your experience?"
        className="feedback-textarea"
      />

      <button
        className="feedback-button"
      >
        Submit
      </button>
      </form>
    </div>
  )
}
