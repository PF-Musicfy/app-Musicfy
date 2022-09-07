import React from "react";
import s from "./modal.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineIdcard } from "react-icons/ai";
import Swal from "sweetalert2";

export default function Modal({ closeModal }) {
  const { usermodal } = useSelector((state) => state.user);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  let user = usermodal[0].username;

  const handleSubject = (e) => {
    setSubject(e.target.value);
  };
  const handleText = (e) => {
    setText(e.target.value);
  };
  function handleOnSubmit(e) {
    e.preventDefault();

    try {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      let email = usermodal[0].email;
      closeModal(false);
      axios
        .post(`${axios.defaults.baseURL}/send-message`, {
          email,
          subject,
          text,
        }).then(()=> {
          Toast.fire({
            icon: 'success',
            title: 'Message send sucessfully'
          })
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form name="modal" onSubmit={handleOnSubmit}>
      <div className={s.container}>
        <div className={s.closebtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={s.cardmessage}>
          <AiOutlineIdcard className={s.icon} />
        </div>
        <div className={s.title}>
          <h1>
            Send a message to <span className={s.username}>{user}</span>
          </h1>
        </div>
        <textarea
          className={s.subject}
          placeholder="Subject..."
          onChange={(e) => {
            handleSubject(e);
          }}
          value={subject}
        ></textarea>
        <textarea
          className={s.text}
          onChange={(e) => {
            handleText(e);
          }}
          value={text}
        ></textarea>
        <div className={s.buttonsubmit}>
          <button type="submit">Send</button>
        </div>
      </div>
    </form>
  );
}
