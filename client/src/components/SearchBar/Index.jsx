import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../store/slice";
import styles from './index.module.css'
import { BiSearchAlt } from "react-icons/bi";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [infoName, setInfoName] = useState('');
    // const [stateSearch, setStateSearch] = useState(false);

    // console.log(infoName)

    const handleInputChange = (e) => {
        setInfoName(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getName(infoName));
        setInfoName('')
    }

    return (
        <div className={styles.box} >
            <form name="search" onSubmit={(e) => handleOnSubmit(e)}>
            <div className={styles.lupitaEstilo}>
                    <BiSearchAlt />
                </div>
                <input
                    className={styles.input}
                    type='text'
                    value={infoName}
                    onChange={(e) => {
                        handleInputChange(e)
                    }}
                />
                
            </form>
        </div>
    )
}

export default SearchBar;


{/* <form onSubmit={(e) => handleOnSubmit(e)}>
                <button
                    className={styles.buttonStyle}
                    type="submit"
                    onClick={(e) => handleOnSubmit(e)}
                
                >
                    <div className={styles.lupitaEstilo}>
                        <BiSearchAlt />
                    </div>

                </button>
                <input
                    className={styles.inputStyle}
                    type='text'
                    placeholder="Buscar"
                    value={infoName}
                    onChange={(e) => {
                        handleInputChange(e)
                    }}
                
                />
            </form> */}