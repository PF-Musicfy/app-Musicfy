import { useEffect } from "react";

export default function TestMP() {
  useEffect(() => {
    window.location.replace("http://localhost:3000/checkoutpremium");
  }, []);
  return (
    <>
      <h1>Hola mundo</h1>
    </>
  );
}
