import { useLocation } from 'react-router-dom';

export default function Page404(){
  const location = useLocation();

  return (
    <div>
      <p>La ruta {location.pathname}</p>
      <p>No existe o esta en desarrollo</p>
    </div>
  );
}
