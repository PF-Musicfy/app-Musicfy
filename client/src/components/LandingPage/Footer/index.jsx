import { Link } from 'react-router-dom';
import { CgFacebook, CgInstagram } from 'react-icons/cg';
import { BsTwitter, BsGithub } from 'react-icons/bs'
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';
import './footer.css';

export default function Footer(){
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className='footer-content'>
        <div className='footer-logo'>
          <img
            src=''
            alt='Musicfy Logo'
            onClick={() => navigate('/')}
          />
        </div>
        <div className='footer-listas'>
          <div>
            Enlaces Utiles
            <Link to='/home'>Reproductor</Link>
            <Link to='/premium'>Premium</Link>
          </div>
          <div>
            Empresa
            <Link to='/about'>Sobre nosotros</Link>
          </div>
        </div>
        <div className='footer-social'>
          <IconContext.Provider
            value={{className: 'footer-icons'}}
          >
            <CgFacebook
              onClick={() => window.location.assign('http://facebook.com')}
            />
            <CgInstagram
              onClick={() => window.location.assign('http://instagram.com')}
            />
            <BsTwitter
              onClick={() => window.location.assign('http://twitter.com')}
            />
            <BsGithub
              onClick={() => window.location.assign('http://github.com')}
            />
          </IconContext.Provider>
        </div>
      </div>
      <div className="footer-licencia">
        <div className="footer-licencia-enlaces">
          <Link to='/license'>licencia</Link>
          <Link to='/ads'>sobre los anuncios</Link>
        </div>
        <div>
          © 2022 Musicfy AB
        </div>
      </div>
    </div>
  )
}
