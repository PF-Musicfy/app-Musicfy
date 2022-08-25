import styles from "./carduser.module.css";
import { TbMessage2 } from "react-icons/tb";

export default function CardUser({ name, email, status, plan }) {
  function handleClick() {}
  function handleMessage() {}

  return (
    <div className={styles.container}>
      <h2 className={styles.name}>{name}</h2>
      <p>{email}</p>
      <p>{plan}</p>
      <button
        className={(status = "true") ? styles.isAdmin : styles.notAdmin}
        onClick={handleClick}
      >
        Admin
      </button>
      <TbMessage2 onClick={handleMessage} />
    </div>
  );
}
