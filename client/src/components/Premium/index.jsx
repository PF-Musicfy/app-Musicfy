import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import Footer from "../LandingPage/Footer";
import { CardPlan } from "components/Cards";
import styles from "./premium.module.css";
import stylesLight from "./premiumLight.module.css";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import { useSelector } from "react-redux";

export default function Premium() {
  const { user } = useSelector((state) => state.user);
  const theme = localStorage.getItem("theme");

  return (
    <>
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}
      <div
        className={
          theme === "light" ? stylesLight.mainContainer : styles.mainContainer
        }
      >
        <div
          className={
            theme === "light" ? stylesLight.subcontainer : styles.subcontainer
          }
        >
          <span
            className={theme === "light" ? stylesLight.Title : styles.Title}
          >
            Listen without limits
          </span>
          <span
            className={
              theme === "light" ? stylesLight.SubTitle : styles.SubTitle
            }
          >
            Play millions of songs ad-free, on-demand, and cancel anytime
          </span>
        </div>
        <div
          className={
            theme === "light" ? stylesLight.containerCard : styles.containerCard
          }
        >
          <CardPlan
            plan={"$9.99 / 1 month"}
            btnPrice={"9.99"}
            month={"1"}
            title={"Monthly"}
          />
          <CardPlan
            plan={"$26.99 / 3 months"}
            btnPrice={"26.99"}
            month={"3"}
            title={"Quarterly"}
          />
          <CardPlan
            plan={"$99.99 / 12 months"}
            btnPrice={"99.99"}
            month={"12"}
            title={"Annual"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
