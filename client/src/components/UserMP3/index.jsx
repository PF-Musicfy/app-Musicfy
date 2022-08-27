import styles from "./UserMP3.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMP3 } from "../../store/slice";

export default function UserMP3() {
  const [imageSelected, setImageSelected] = useState("");
  const dispatch = useDispatch();
  const { usermp3 } = useSelector((state) => state.music);

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.imgAvatarContainer}></div>
      <audio src={usermp3} preload="none" controls></audio>
      <p className={styles.titleAvatar}>Upload MP3</p>
      <input className={styles.inputAvatar} onChange={(e) => setImageSelected(e.target.files[0])} type="file" />
      <button className={styles.buttonAvatar} onClick={() => dispatch(getMP3(imageSelected))}>
        Upload
      </button>
    </div>
  );
}
