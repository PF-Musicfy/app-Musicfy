import Footer from "./Footer";
import BodyLanding from "./Body";
import NavBarLanding from "./NavBarLanding";
import Body2 from "./Body2";

export default function LandingPage() {
  return (
    <div className="landing">
      <NavBarLanding />
      <BodyLanding />
      <Body2 />
      <Footer />
    </div>
  );
}
