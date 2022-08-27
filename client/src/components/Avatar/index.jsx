import styles from "./Avatar.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvatar } from "../../store/slice";

export default function Avatar() {
  const [imageSelected, setImageSelected] = useState("");
  const dispatch = useDispatch();
  const { avatar } = useSelector((state) => state.music);
  const { user } = useSelector((state) => state.user);

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.imgAvatarContainer}>
        <img className={styles.imgAvatar} src={avatar ? avatar : user.avatar} alt="avatar" />
      </div>
      <p className={styles.titleAvatar}>Upload your Avatar</p>
      <input className={styles.inputAvatar} onChange={(e) => setImageSelected(e.target.files[0])} type="file" />
      <button className={styles.buttonAvatar} onClick={() => dispatch(getAvatar(imageSelected))}>
        Upload
      </button>
    </div>
  );
}

/*
{
    name,
    avatarURL,
    email,
    plan,
}
*/

// favoritos: [cancion1, cancion2, ...]
// listas: [{lista1: [cancion1, cancion2]}, {lista2: [cancion1, cancion2,]}]

// const uploadImage = () => {
//   const formData = new FormData();
//   formData.append("file", imageSelected);
//   formData.append("upload_preset", "musicfy");
//   // .post("https://api.cloudinary.com/v1_1/hugok2k/video/upload", formData)
//   axios
//     .post("https://api.cloudinary.com/v1_1/hugok2k/image/upload", formData)
//     .then((response) => console.log(response.data.secure_url));
// };
