import { useDispatch, useSelector } from "react-redux";
import Buttons from "./Buttons";
import CardUser from "./CardUser";
import FirstLine from "./firstline";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import { useEffect } from "react";
import { getUsers } from "../../store/slice/user";
export default function PageAdmin() {
  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
      <Buttons />
      <FirstLine />
      <Cards users={users} />
    </div>
  );
}
