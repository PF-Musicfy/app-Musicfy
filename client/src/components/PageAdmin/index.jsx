import Buttons from "./Buttons";
import CardUser from "./CardUser";
import FirstLine from "./firstline";
import SearchBar from "./SearchBar";

export default function PageAdmin() {
  return (
    <div>
      <SearchBar />
      <Buttons />
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
