import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getUsersFree,
  getUsersPremium,
  getUsersAdmin,
  getUsers,
} from "../../../store/slice/user";
import styles from "./buttons.module.css";
export default function Buttons() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    free: false,
    premium: false,
    admins: false,
  });

  const changingState = (e) => {
    e.preventDefault();
    setState({
      ...state,
      free: e.target.name === "free" ? true : false,
      premium: e.target.name === "premium" ? true : false,
      admins: e.target.name === "admins" ? true : false,
    });
    if (state.free === true) dispatch(getUsersFree());
    else if (state.premium === true) dispatch(getUsersPremium());
    else if (state.admins === true) dispatch(getUsersAdmin());
  };
  const onClickResetFilters = () => {
    setState({ free: false, premium: false, admins: false });
    dispatch(getUsers());
  };
  return (
    <div className={styles.buttonsFilter}>
      {
        <button
          className={
            state.free === true ? styles.buttonStyles : styles.buttonOff
          }
          name="free"
          onClick={(e) => changingState(e)}
        >
          Free
        </button>
      }
      {
        <button
          className={
            state.premium === true ? styles.buttonStyles : styles.buttonOff
          }
          name="premium"
          onClick={(e) => changingState(e)}
        >
          Premium
        </button>
      }
      {
        <button
          className={
            state.admins === true ? styles.buttonStyles : styles.buttonOff
          }
          name="admins"
          onClick={(e) => changingState(e)}
        >
          Admins
        </button>
      }
      {
        <button
          className={styles.buttonStyles}
          name="reset"
          onClick={() => onClickResetFilters()}
        >
          All users
        </button>
      }
    </div>
  );
}
