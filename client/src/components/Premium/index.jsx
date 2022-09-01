import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import Footer from "../LandingPage/Footer";
import CardPlan from "../CardPlan";
import styles from "./premium.module.css";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import { useSelector } from "react-redux";

export default function Premium() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}
      <div className={styles.mainContainer}>
        <div className={styles.subcontainer}>
          {/* <img
          src="https://i.pinimg.com/originals/66/d1/b4/66d1b4865389a633bc108a602aee9311.jpg"
          alt="album"
          className={styles.imagen}
        /> */}
          <span className={styles.Title}>Listen without limits</span>
          <span className={styles.SubTitle}>Play millions of songs ad-free, on-demand, and cancel anytime</span>
        </div>
        <div className={styles.containerCard}>
          <CardPlan plan={"$9.99 / 1 month"} btnPrice={"9.99"} month={"1"} title={"Monthly"} />
          <CardPlan plan={"$26.99 / 3 months"} btnPrice={"26.99"} month={"3"} title={"Quarterly"} />
          <CardPlan plan={"$99.99 / 12 months"} btnPrice={"99.99"} month={"12"} title={"Annual"} />
        </div>
      </div>
      <Footer />
    </>
  );
}
