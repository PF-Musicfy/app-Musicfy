import { useDispatch, useSelector } from "react-redux";
import Buttons from "./Buttons";
import CardUser from "./CardUser";
import FirstLine from "./firstline";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import { useEffect } from "react";
import s from "./table.module.css";
import { getUsers } from "../../store/slice/user";
import { BiMailSend } from "react-icons/bi";
import { ImLock, ImUnlocked } from "react-icons/im";
import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";

function Fila({ user, openModal }) {
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
  return (
    <tr className={s.row}>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.premium ? "Premium" : "Free"}</td>
      <td onClick={handleAdmin} id={"a" + user._id} className={s.pointer}>
        {admin ? "Admin" : "Not Admin"}
      </td>
      <td onClick={handleBlock} id={user._id} className={s.pointer}>
        {block ? <ImLock /> : <ImUnlocked />}
      </td>
      <td>
        <BiMailSend
          onClick={() => {
            openModal({ switch: true, username: user.username });
          }}
          className={s.pointer}
        />
      </td>
      <td></td>
    </tr>
  );
}
function Mapeo({ users, openModal, modal }) {
  return (
    <>
      {users?.map((e) => (
        <Fila
          key={e._id}
          user={e}
          openModal={() => openModal({ ...modal, switch: true })}
        />
      ))}
    </>
  );
}

export default function PageAdmin() {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [modal, setModal] = useState({ switch: false, username: null });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <SearchBar />
      <Buttons />
      {modal.switch && (
        <div className={s.modalito}>
          {console.log("esto es modal", modal)}
          <Modal closeModal={setModal} switch={modal.username} />
        </div>
      )}
      {/* <FirstLine />
      <Cards users={users} />  */}
      <table className={s.table}>
        <thead>
          <tr className={s.head}>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Block</th>
            <th>Msg</th>
          </tr>
        </thead>
        <tbody>
          <Mapeo users={users} openModal={setModal} />
        </tbody>
      </table>
    </div>
  );
}
