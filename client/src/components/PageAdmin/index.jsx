import { useDispatch, useSelector } from "react-redux";
import Buttons from "./Buttons";
import SearchBar from "./SearchBar";
import { useEffect } from "react";
import s from "./table.module.css";
import { getUserModal, getUsers } from "../../store/slice/user";
import { BiMailSend } from "react-icons/bi";
import { ImLock, ImUnlocked } from "react-icons/im";
import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Swal from "sweetalert2";

function Fila({ userindex, openModal }) {
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(false);
  const [block, setBlock] = useState(false);
  const [currentModalUser, setCurrentModal] = useState("");
  const { user } = useSelector((state) => state.user);

  let findRol = () => {
    if (user.master) return "Admin";
    return "Moderator";
  };
  let currentRol = findRol();

  useEffect(() => {
    setAdmin(userindex.admin);
    setBlock(userindex.isblocked);
    setCurrentModal(userindex.email);
  }, [currentModalUser]);

  function handleAdmin(e) {
    e.preventDefault();
    if (currentRol === "Admin" && !userindex.master) {
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
  }
  function handleBlock(e) {
    e.preventDefault();
    if ((currentRol === "Admin" && !userindex.master) || !userindex.admin) {

      Swal.fire({
        title: 'Do you want to block this user?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Block',
        denyButtonText: `Unblock`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setBlock(true);
          axios
            .post(`${axios.defaults.baseURL}/user/changeblock`, {
              id: userindex._id,
            })
            .then(dispatch(getUsers()))
          Swal.fire('Blocked!', '', 'success')
        } else if (result.isDenied) {
          setBlock(false);
          axios
            .post(`${axios.defaults.baseURL}/user/changeblock`, {
              id: userindex._id,
            })
            .then(dispatch(getUsers()))
          Swal.fire('Unblocked!', '', 'success')
        }
      })
    }
  }

  return (
    <tr className={s.row}>
      <td>{userindex.username}</td>
      <td>{userindex.email}</td>
      <td>{userindex.premium ? "Premium" : "Free"}</td>
      <td onClick={handleAdmin} id={"a" + userindex._id} className={s.pointer}>
        {admin ? "Moderator" : "Not Moderator"}
      </td>
      <td onClick={handleBlock} id={userindex._id}>
        {block ? (
          <ImLock className={s.pointer} />
        ) : (
          <ImUnlocked className={s.pointer} />
        )}
      </td>
      <td>
        <BiMailSend
          onClick={() => {
            dispatch(getUserModal(currentModalUser)).then(() => {
              openModal(true);
              setCurrentModal("");
            });
          }}
          className={s.pointer}
        />
      </td>
    </tr>
  );
}
function Mapeo({ users, openModal }) {
  return (
    <>
      {users?.map((e) => (
        <Fila key={e._id} userindex={e} openModal={() => openModal(true)} />
      ))}
    </>
  );
}

export default function PageAdmin() {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={modal ? s.containerblur : s.containerbase}>
      <SearchBar />
      <Buttons />
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
      {modal && (
        <div className={s.modalito}>
          <Modal closeModal={setModal} />
        </div>
      )}
    </div>
  );
}
