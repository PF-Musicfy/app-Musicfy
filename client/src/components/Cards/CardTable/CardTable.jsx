import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import s from "./cardtable.module.css";
import { getUsers } from "store/slice/user";

export default function CardTable() {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <table className={s.table}>
        <thead>
          <tr className={s.head}>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0,12)?.map((e) => (
            <tr key={e._id} className={s.row}>
              <td>{e.username}</td>
              <td>{e.email}</td>
              <td>{e.premium ? "Premium" : "Free"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
