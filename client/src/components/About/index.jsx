import NavBarLandingOn from '../LandingPage/NavBarLandingOn'
import Footer from '../LandingPage/Footer'
import CardAbout from './CardAbout'
import styles from './about.module.css'
import stylesLight from './aboutLight.module.css'
import NavBarLandingOff from '../LandingPage/NavBarLandingOff'
import { useSelector } from 'react-redux'

function About() {
  let staff = [
    {
      name: 'Jose Casanova',
      title: 'Full Stack Developer',
      location: 'Maracaibo - Venezuela',
      images:
        'https://res.cloudinary.com/dyj81r2fi/image/upload/v1663959798/about/photo_2022-08-22_00-08-07_trhvn9_nwelgj.jpg',
      linkedin: 'https://www.linkedin.com/in/jacasanova98/',
      github: 'https://github.com/Ja-casn'
    },
    {
      name: 'Hugo Avila',
      title: 'Full Stack Developer',
      location: 'Buenos Aires - Argentina',
      images:
        'https://res.cloudinary.com/hugok2k/image/upload/v1678639805/Varios/IMG_20220105_110054726_HDR_qejxvm_o9r9ut.jpg',
      linkedin: 'https://www.linkedin.com/in/devhugoavila/',
      github: 'https://github.com/hugok2k'
    },
    {
      name: 'Santiago Levy',
      title: 'Full Stack Developer',
      location: 'Santiago del Estero - Argentina',
      images:
        'https://res.cloudinary.com/hugok2k/image/upload/v1678639805/Varios/photo_2022-08-21_16-04-30_abjclr.jpg',
      linkedin: 'https://www.linkedin.com/in/santiago-levy-dev/',
      github: 'https://github.com/Kosovomba'
    },
    {
      name: 'Elam Cano',
      title: 'Full Stack Developer',
      location: 'Corrientes - Argentina',
      images:
        'https://res.cloudinary.com/dyj81r2fi/image/upload/v1663959791/about/photo_2022-08-21_16-00-55_x5irlx_mwfiwx.jpg',
      linkedin: 'https://www.linkedin.com/in/elam-cano-bb0419239/',
      github: 'https://github.com/ElamCano'
    },
    {
      name: 'Eduardo Sequeira',
      title: 'Full Stack Developer',
      location: 'Caracas - Venezuela',
      images: 'https://res.cloudinary.com/dyj81r2fi/image/upload/v1663959783/about/edu_mnvyew_jn3evs.jpg',
      linkedin: 'https://www.linkedin.com/in/eduardo-sequeira/',
      github: 'https://github.com/Eduardoasm'
    },
    {
      name: 'Gabriel Sanchez',
      title: 'Full Stack Developer',
      location: 'Buenos Aires - Argentina',
      images: 'https://res.cloudinary.com/dyj81r2fi/image/upload/v1663959775/about/gaby_fgdtk9_qwvu6h.jpg',
      linkedin: 'https://www.linkedin.com/in/gabriel-sanchez-0591a723a/',
      github: 'https://github.com/gszcode'
    },
    {
      name: 'Alejandro Maturrano',
      title: 'Full Stack Developer',
      location: 'Lima, Peru',
      images: 'https://res.cloudinary.com/dyj81r2fi/image/upload/v1663959701/about/alejandro_n2rvls.jpg',
      linkedin: 'https://www.linkedin.com/in/tm10ymhp/',
      github: 'https://github.com/TM10YMhp'
    }
  ]

  const shuffle = function (deck) {
    let deckShuffled = []
    while (deck.length > 0) {
      let cardIndex = Math.floor(Math.random() * deck.length)
      let card = deck[cardIndex]
      deckShuffled.push(card)
      deck.splice(cardIndex, 1)
    }
    return deckShuffled
  }
  staff = shuffle(staff)

  const { user } = useSelector((state) => state.user)
  const theme = localStorage.getItem('theme')

  return (
    <>
      {Object.keys(user).length ? <NavBarLandingOn /> : <NavBarLandingOff />}

      <div className={theme === 'light' ? stylesLight.containerAbout : styles.containerAbout}>
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
  )
}

export default About
