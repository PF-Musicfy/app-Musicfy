import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TestMP() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/checkoutpremium");
  }, []);
  return (
    <>
      <h1>Hola mundo</h1>
    </>
  );
}
