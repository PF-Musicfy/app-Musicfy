import { useLocation, Link } from "react-router-dom";
import styles from "./page404.module.css";
export default function Page404() {
  const location = useLocation();

  return (
    <div className={styles.container}>
      {/*  <p>La ruta {location.pathname} no existe</p> */}
      <img
        src="https://cdna.artstation.com/p/assets/images/images/018/632/934/large/stacha-l-isometric404.jpg?1560137070"
        alt="notfound"
        className={styles.imagen}
      />
      <div className={styles.but}>
        <h1 className={styles.h1}>Seems like you're lost...</h1>
        <Link to="/home">
          <button className={styles.button}>Go back Home</button>
        </Link>
      </div>
    </div>
  );
}
