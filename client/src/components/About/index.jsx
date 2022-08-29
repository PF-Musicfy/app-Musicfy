import NavBarLandingOn from "../LandingPage/NavBarLandingOn";
import Footer from "../LandingPage/Footer";
import CardAbout from "./CardAbout";
import styles from "./about.module.css";
import { MdLocationOn } from "react-icons/md";
import NavBarLandingOff from "../LandingPage/NavBarLandingOff"
import { useSelector } from "react-redux"

function About() {
  const staff = [
    {
      name: "Jose Casanova",
      title: "Full Stack Developer",
      location: "Maracaibo - Venezuela",
      images:
        "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661137839/photo_2022-08-22_00-08-07_trhvn9.jpg"
    },
    {
      name: "Hugo Avila",
      title: "Full Stack Developer",
      location: "Buenos Aires - Argentina",
      images:
        "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661134228/IMG_20220105_110054726_HDR_qejxvm.jpg"
    },
    {
      name: "Santiago Levy",
      title: "Full Stack Developer",
      location: "Santiago del Estero - Argentina",
      images:
        "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661134228/photo_2022-08-21_16-04-30_uearmu.jpg"
    },
    {
      name: "Elam Cano",
      title: "Full Stack Developer",
      location: "Corrientes - Argentina",
      images:
        "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661133221/photo_2022-08-21_16-00-55_x5irlx.jpg"
    },
    {
      name: "Eduardo Sequeira",
      title: "Full Stack Developer",
      location: "Caracas - Venezuela",
      images: "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661142530/edu_mnvyew.jpg"
    },
    {
      name: "Gabriel Sanchez",
      title: "Full Stack Developer",
      location: "Buenos Aires - Argentina",
      images: "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_518/v1661142963/gaby_fgdtk9.jpg"
    },
    {
      name: "Alejandro Maturrano",
      title: "Full Stack Developer",
      location: "Lima, Peru",
      images: "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_240/v1661186886/alejandro_pciivb.jpg"
    }
  ];

  const { user } = useSelector(state => state.user)
  return (
    <>
      {
        Object.keys(user).length? <NavBarLandingOn /> : <NavBarLandingOff />
      }

      <div className={styles.containerAbout}>
        {staff.map((e) => (
          <div className="container-about" key={e.name}>
            <CardAbout name={e.name} title={e.title} location={e.location} images={e.images} />
          </div>
        ))}
        {/* <CardAbout name={staff.name} title={staff.title} location={staff.location} images={staff.images} /> */}
      </div>
      <Footer />
    </>
  );
}

export default About;