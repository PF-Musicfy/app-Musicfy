import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./searchbar.module.css";
import { BiSearchAlt } from "react-icons/bi";
import { getUsers } from "../../../store/slice/user";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [infoName, setInfoName] = useState("");

  const handleInputChange = (e) => {
    setInfoName(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getUsers(infoName));
    setInfoName("");
  };

  return (
    <div className={styles.box}>
      <form name="search" onSubmit={(e) => handleOnSubmit(e)}>
        <div className={styles.lupitaEstilo}>
          <BiSearchAlt />
        </div>
        <input
          className={styles.input}
          type="text"
          value={infoName}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
