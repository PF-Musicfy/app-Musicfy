import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MenuTresPuntos.module.css";
import { playlistUser } from "store/slice/user";
import { userTokenInfo } from "store/slice/user";

export default function MenuTresPuntos({ setModal }) {
  const dispatch = useDispatch();
  const [listamas, setListamas] = useState({ name: "" });
  const { user } = useSelector((state) => state.user);
  const handleListaMasChange = (e) => {
    e.preventDefault();
    setListamas({ ...listamas, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(playlistUser(listamas));
    setListamas({ name: "" });
    setModal(false);
  };
  useEffect(() => {
    dispatch(userTokenInfo());
  }, [dispatch]);

  return (
    <div className={styles.mainContainer}>
      <span className={styles.title}>CREATE LIST</span>
      {/* <hr className={styles.mihr}></hr> */}
      <form
        className={styles.containerInput}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {console.log(listamas)}
        <input
          name="name"
          value={listamas.name}
          type="text"
          className={styles.inputLista}
          onChange={(e) => {
            handleListaMasChange(e);
          }}
        ></input>
        <button className={styles.signomas}>+</button>
      </form>
      <span className={styles.title2}>ADD SONG TO PLAYLIST</span>

      {user.playlist.map((e) => (
        <span
          className={styles.miLista}
          onClick={() => {
            setModal(false);
          }}
        >
          {e.name}
        </span>
      ))}
    </div>
  );
}
