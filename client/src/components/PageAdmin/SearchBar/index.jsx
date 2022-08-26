import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./searchbar.module.css";
import { BiSearchAlt } from "react-icons/bi";
import { getUserByName } from "../../../store/slice/user";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [infoName, setInfoName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setInfoName(e.target.value);
    dispatch(getUserByName(infoName));
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(getUserByName(infoName));
    setInfoName("");
  }

  return (
    <div className={styles.box}>
      <form name="search" onSubmit={handleOnSubmit}>
        <div className={styles.lupitaEstilo}>
          <BiSearchAlt />
        </div>
        <input
          className={styles.input}
          type="text"
          value={infoName}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
