import styles from "./Avatar.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvatar } from "../../store/slice";
import { userTokenAvatar } from "../../store/slice/user";
import { useNavigate } from "react-router-dom";

export default function Avatar() {
  const [imageSelected, setImageSelected] = useState("");
  const dispatch = useDispatch();
  const { avatar } = useSelector((state) => state.music);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  function handleSubmit() {
    dispatch(getAvatar(imageSelected));
    
    setTimeout(() => {
      navigate(0)
    }, 2000);
  }
  useEffect(() => {
    if (avatar.length > 0) {
      dispatch(userTokenAvatar(avatar));
    }
  }, [avatar]);
  return (
    <div className={styles.avatarContainer}>
      <div className={styles.imgAvatarContainer}>
        <img className={styles.imgAvatar} src={avatar ? avatar : user.avatar} alt="avatar" />
      </div>
      <p className={styles.titleAvatar}>Upload your Avatar</p>
      <input className={styles.inputAvatar} onChange={(e) => setImageSelected(e.target.files[0])} type="file" />
      <button className={styles.buttonAvatar} onClick={() => handleSubmit()}>
        Upload
      </button>
    </div>
  );
}
