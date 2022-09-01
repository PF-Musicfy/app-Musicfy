import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import Footer from "../LandingPage/Footer";
import CardAbout from "./CardAbout";
import styles from "./about.module.css";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff";
import { useSelector } from "react-redux";

function About() {
  let staff = [
    {
      name: "Jose Casanova",
      title: "Full Stack Developer",
      location: "Maracaibo - Venezuela",
      images:
        "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661137839/photo_2022-08-22_00-08-07_trhvn9.jpg",
      linkedin: "https://www.linkedin.com/in/jacasanova98/",
      github: "https://github.com/Ja-casn"
    },
    {
      name: "Hugo Avila",
      title: "Full Stack Developer",
      location: "Buenos Aires - Argentina",
      images:
        "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661134228/IMG_20220105_110054726_HDR_qejxvm.jpg",
      linkedin: "https://www.linkedin.com/in/hugo-avila-9465a09/",
      github: "https://github.com/hugok2k"
    },
    {
      name: "Santiago Levy",
      title: "Full Stack Developer",
      location: "Santiago del Estero - Argentina",
      images:
        "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661134228/photo_2022-08-21_16-04-30_uearmu.jpg",
      linkedin: "https://www.linkedin.com",
      github: "https://github.com"
    },
    {
      name: "Elam Cano",
      title: "Full Stack Developer",
      location: "Corrientes - Argentina",
      images:
        "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661133221/photo_2022-08-21_16-00-55_x5irlx.jpg",
      linkedin: "https://www.linkedin.com/in/elam-cano-bb0419239/",
      github: "https://github.com/ElamCano"
    },
    {
      name: "Eduardo Sequeira",
      title: "Full Stack Developer",
      location: "Caracas - Venezuela",
      images: "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661142530/edu_mnvyew.jpg",
      linkedin: "https://www.linkedin.com/in/eduardo-sequeira-4502bb244/",
      github: "https://github.com/Eduardoasm"
    },
    {
      name: "Gabriel Sanchez",
      title: "Full Stack Developer",
      location: "Buenos Aires - Argentina",
      images: "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_518/v1661142963/gaby_fgdtk9.jpg",
      linkedin: "https://www.linkedin.com/in/gabriel-sanchez-0591a723a/",
      github: "https://github.com/gszcode"
    },
    {
      name: "Alejandro Maturrano",
      title: "Full Stack Developer",
      location: "Lima, Peru",
      images: "https://res.cloudinary.com/hugok2k/image/upload/v1661916969/alejandro_leodxr.jpg",
      linkedin: "https://www.linkedin.com",
      github: "https://github.com/TM10YMhp"
    }
  ];

  const shuffle = function (deck) {
    let deckShuffled = [];
    while (deck.length > 0) {
      let cardIndex = Math.floor(Math.random() * deck.length);
      let card = deck[cardIndex];
      deckShuffled.push(card);
      deck.splice(cardIndex, 1);
    }
    return deckShuffled;
  };
  staff = shuffle(staff);

  const { user } = useSelector((state) => state.user);
  return (
    <>
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}

      <div className={styles.containerAbout}>
        {staff.map((e) => (
          <div className="container-about" key={e.name}>
            <CardAbout
              name={e.name}
              title={e.title}
              location={e.location}
              images={e.images}
              linkedin={e.linkedin}
              github={e.github}
            />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default About;
