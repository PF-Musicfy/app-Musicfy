import CardUser from "./CardUser";
import FirstLine from "./firstline";

export default function PageAdmin() {
  return (
    <div>
      <FirstLine />
      <CardUser
        name="Elam"
        email="elamcano@gmail.com"
        plan="Premium"
        status="false"
      />
    </div>
  );
}
