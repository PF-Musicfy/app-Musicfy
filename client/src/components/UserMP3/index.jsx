import styles from "./UserMP3.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMP3 } from "../../store/slice";
import { uploadMp3User } from "store/slice/user";

export default function UserMP3() {
  const [mp3selected, setMp3Selected] = useState("");
  const dispatch = useDispatch();
  const { usermp3 } = useSelector((state) => state.music);
  const theme = localStorage.getItem("theme");
  const [detailmp3, setDetailmp3] = useState({
    titlesong: "",
    artists: "",
    urlsong: "",
  });

  const handleChangeMp3 = (e) => {
    e.preventDefault();
    setDetailmp3({ ...detailmp3, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getMP3(mp3selected)).then((e) => {
      detailmp3.urlsong = e;
      dispatch(uploadMp3User(detailmp3));
    });
  };

  return (
    <div className={styles.avatarContainer}>
      <p
        className={
          theme === "light" ? styles.titleAvatarLight : styles.titleAvatar
        }
      >
        Upload MP3
      </p>
      <form
        className={styles.formContainer}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <span
          className={
            theme === "light" ? styles.spanTitlesLight : styles.spanTitles
          }
        >
          Title song
        </span>
        <input
          name="titlesong"
          value={detailmp3.titlesong}
          onChange={(e) => {
            handleChangeMp3(e);
          }}
          type="text"
          placeholder="Enter title"
          className={styles.inputTitle}
        ></input>
        <span className={styles.spanTitles}>Artists</span>
        <input
          name="artists"
          value={detailmp3.artists}
          onChange={(e) => {
            handleChangeMp3(e);
          }}
          type="text"
          placeholder="Enter Artist"
          className={styles.inputTitle}
        ></input>
        <input
          // name="urlsong"
          className={styles.inputAvatar}
          onChange={(e) => setMp3Selected(e.target.files[0])}
          type="file"
        />
        <button className={styles.buttonAvatar}>Upload song</button>
      </form>
    </div>
  );
}
