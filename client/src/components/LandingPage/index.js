import Footer from "./Footer";
import BodyLanding from "./Body";
import NavBarLanding from "../LandingPage/NavBarLanding";
import "./landingpage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <NavBarLanding />
      <BodyLanding />
      <Footer />
    </div>
  );
}
