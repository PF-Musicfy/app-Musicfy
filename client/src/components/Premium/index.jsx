import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import Footer from "../LandingPage/Footer";
import CardPlan from "../CardPlan";
import styles from "./premium.module.css";
import { useSelector } from 'react-redux'
import NavBarLandingOn from "../LandingPage/NavBarLandingOn";

export default function Premium() {

  const { userToken } = useSelector(state => state.user) //aqui tienes la info del usuario

  return (
    <div>
      {
        userToken.online === true? <NavBarLandingOn /> : <NavBarLandingOff />
      }
      {/* <NavBarLandingOff /> */}
      <div className={styles.subcontainer}>
        <img
          src="https://i.pinimg.com/originals/66/d1/b4/66d1b4865389a633bc108a602aee9311.jpg"
          alt="album"
          className={styles.imagen}
        />
        <h1 className={styles.title}>Listen trend music any time, anywhere</h1>
      </div>
      <div className={styles.subcontainer2}>
        <CardPlan plan={"$2,99 / 1 month"} />
        <CardPlan plan={"$5,99 / 3 months"} />
        <CardPlan plan={"$20,99 / 12 months"} />
      </div>
      <Footer />
    </div>
  );
}
