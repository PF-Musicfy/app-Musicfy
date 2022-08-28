import { useDispatch, useSelector } from "react-redux";
import Buttons from "./Buttons";
import CardUser from "./CardUser";
import FirstLine from "./firstline";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import { useEffect } from "react";
import s from "./table.module.css";
import { getUsers } from "../../store/slice/user";

function Fila({ user }) {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.premium ? "Premium" : "Free"}</td>
      <td>{user.admin ? "Admin" : "No es Admin"}</td>
      <td>mandar mensaje</td>
    </tr>
  );
}
function Mapeo({ users }) {
  return (
    <>
      {users?.map((e) => (
        <Fila key={e._id} user={e} />
      ))}
    </>
  );
}

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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Msg</th>
          </tr>
        </thead>
        <tbody>
          <Mapeo users={users} />
        </tbody>
      </table>
    </div>
  );
}
