import { useLocation } from "react-router-dom";

export default function CheckUp() {
  const location = useLocation();

  const asd = new URLSearchParams(location.search)
  const query = asd.get('token')

  return (
    <div>
      query: {query
        ? query
        : 'no hay token'
      }
    </div>
  )
}
