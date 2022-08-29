import { useDispatch, useSelector } from "react-redux";
import Buttons from "./Buttons";
import CardUser from "./CardUser";
import FirstLine from "./firstline";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import { useEffect } from "react";
import s from "./table.module.css";
import { getUsers } from "../../store/slice/user";
import { TbMessage2 } from "react-icons/tb";
import { ImLock, ImUnlocked } from "react-icons/im";
import { useState } from "react";
import axios from "axios";

function Fila({ user }) {
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(false);
  const [block, setBlock] = useState(false);

  useEffect(() => {
    setAdmin(user.admin);
    setBlock(user.isblocked);
  }, []);

  function handleAdmin(e) {
    e.preventDefault();
    let variable = e.target.id;
    variable = variable.slice(1);
    setAdmin(!admin);
    axios
      .post(`${axios.defaults.baseURL}/user/changeadmin`, {
        id: variable,
      })
      .then(dispatch(getUsers()))
      .catch((e) => console.log(e));
  }
  function handleBlock(e) {
    e.preventDefault();
    setBlock(!block);
    axios
      .post(`${axios.defaults.baseURL}/user/changeblock`, {
        id: user._id,
      })
      .then(dispatch(getUsers()))
      .catch((e) => console.log(e));
  }
  function handleMessage() {}

  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.premium ? "Premium" : "Free"}</td>
      <td onClick={handleAdmin} id={"a" + user._id}>
        {admin ? "Admin" : "Not Admin"}
      </td>
      <td onClick={handleBlock} id={user._id}>
        {block ? <ImLock /> : <ImUnlocked />}
      </td>
      <td>
        <TbMessage2 onClick={handleMessage} />
      </td>
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
      {/* <FirstLine />
      <Cards users={users} />  */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Block</th>
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
