import {Link} from 'react-router-dom';
import './footer.css';

export default function Footer(){
  return (
    <div className="footer">
        <div className="footer-lista">
          <div>
            <Link to='/'>Musicfy Logo</Link>
          </div>
          <div>
            Servicios
            <Link to='/home'>Reproductor</Link>
            <Link to='/premium'>Premium</Link>
          </div>
          <div>
            Compañia
            <Link to='/about'>Sobre nosotros</Link>
          </div>
          <div>
            Redes Sociales
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
