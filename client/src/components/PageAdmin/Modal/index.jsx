import React from "react";
import s from "./modal.module.css";

export default function Modal({ closeModal, modal }) {
  const { user } = useSelector((state) => state.user);
  function handleOnSubmit() {}
  return (
    <div className={s.background}>
      <form name="modal" onSubmit={(e) => handleOnSubmit(e)}>
        <div className={s.container}>
          <div className={s.closebtn}>
            <button onClick={() => closeModal({ ...modal, switch: false })}>
              X
            </button>
          </div>
          <div className={s.title}>
            <h1>Send a message</h1>
          </div>
          <div className={s.user}>User: {modal}</div>
          <input className={s.input} maxLength="20"></input>
          <div className={s.buttonsubmit}>
            <button type="submit">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
}
