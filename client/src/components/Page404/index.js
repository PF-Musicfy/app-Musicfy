import { useLocation } from "react-router-dom";

export default function Page404() {
  const location = useLocation();

  return (
    <div>
      <p>La ruta {location.pathname} no existe</p>
    </div>
  );
}
