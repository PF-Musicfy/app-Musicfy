import React from "react";
import s from "./modal.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Modal({ closeModal }) {
  const { usermodal } = useSelector((state) => state.user);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const handleSubject = (e) => {
    setSubject(e.target.value);
  };
  const handleText = (e) => {
    setText(e.target.value);
  };
  function handleOnSubmit(e) {
    e.preventDefault();
    let email = usermodal[0].email;
    closeModal(false);
    axios
      .post(`${axios.defaults.baseURL}/send-message`, {
        email,
        subject,
        text,
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className={s.background}>
      <form name="modal" onSubmit={handleOnSubmit}>
        <div className={s.container}>
          <div className={s.closebtn}>
            <button onClick={() => closeModal(false)}>X</button>
          </div>
          <div className={s.title}>
            <h1>Send a message</h1>
          </div>
          <div className={s.user}>User: {usermodal.username}</div>
          <input
            className={s.subject}
            maxLength="20"
            placeholder="Subject"
            onChange={(e) => {
              handleSubject(e);
            }}
            value={subject}
          ></input>
          <input
            className={s.text}
            maxLength="40"
            onChange={(e) => {
              handleText(e);
            }}
            value={text}
          ></input>
          <div className={s.buttonsubmit}>
            <button type="submit">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
}
