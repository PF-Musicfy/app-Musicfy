import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MenuTresPuntos.module.css";
import { userTokenInfo, musicPlaylist, playlistUser} from "store/slice/user";
import Swal from "sweetalert2";
// import { userTokenInfo } from "store/slice/user";


export default function MenuTresPuntos({ setModal, e }) {
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState({ name: "", playlist: [] });
  const { user } = useSelector((state) => state.user);

  const handleListaMasChange = (e) => {
    e.preventDefault();
    setPlaylist({ ...playlist, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(playlistUser(playlist))
    setPlaylist({ name: "", playlist: [] });
    setModal(false);
  };
  useEffect(() => {
    dispatch(userTokenInfo());
  }, [dispatch]);

    // ---- TOAST ALERT ----
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  
    // ---- TOAST ALERT ----

  const handleMusicPlaylist = (nameMusic) => {
    dispatch(musicPlaylist(e, nameMusic))
    Toast.fire({
      icon: "success",
      title: `The song ${e.name} has added to ${nameMusic}`,
    });
    setModal(false);
  }

  console.log(playlist)

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
        {console.log(playlist)}
        <input
          name="name"
          value={playlist.name}
          type="text"
          className={styles.inputLista}
          onChange={(e) => {
            handleListaMasChange(e);
          }}
        ></input>
        <button className={styles.signomas}>+</button>
      </form>
      <span className={styles.title2}>ADD SONG TO PLAYLIST</span>

      {user.playlists.map((e) => (
        <span
        key={e.name}
          className={styles.miLista}
          onClick={() => {
            handleMusicPlaylist(e.name)
          }}
        >
          {console.log(e.music)}
          {e.name}
        </span>
      ))}
    </div>
  );
}
