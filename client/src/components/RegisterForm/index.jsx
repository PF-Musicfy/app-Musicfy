import { useNavigate } from 'react-router-dom'
// import { fetchUsers } from '../store/actions'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './RegisterForm.module.css'
import axios from 'axios'

export default function RegisterForm() {
    const [newUser, setNewUser] = useState({name: '', eMail: '', password: '', token: ''})
    const users = useSelector((state) => state.users)
    let navigate = useNavigate()
    let error = true
    let errorName = false
    let errorLastName = false
    let errorEMail = false
    let errorPassword = false
    let userNames = []

    if(newUser.name.length === 0 || /[^a-zñáéíóú]/i.test(newUser.name) === true) {
        errorName = true
    }
    if(newUser.lastName.length === 0 || /[^a-zñáéíóú]/i.test(newUser.lastName) === true) {
        errorLastName = true
    }
    if(newUser.eMail.length === 0 || /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(newUser.eMail) === false) {
        errorEMail = true
    }

    if(newUser.password.length !== 8 || /[^a-z0-9ñ]/i.test(newUser.password) === true) {
        errorPassword = true
    }

    if (errorName === false && errorLastName === false && errorEMail === false && errorPassword === false) {
        error = false
    }

    function onClick(e) {
        e.preventDefault()
        navigate(-1)
    }

    function onInputChange(e) {
        e.preventDefault()        
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    function onSubmit(e) {
        e.preventDefault()
        users.map((r)=> {
            return userNames.push(r.name)
        })
        if (userNames.includes(newUser.name)) {
            alert('The name is in use. Insert a different one')}
            else {
        axios.post('http://localhost:3000/api/users', newUser)
        .then(() => {
            alert('User registered succesfully')
            // dispatch(fetchUsers())
                // navigate(-1)
        })
        .catch((error)=> {
            console.log(error)
        })
        }
    }
    return <div className={styles.create}>
        <button className={styles.back} onClick={onClick}>Back</button>        
        <form onSubmit={(e)=> onSubmit(e)} >
            <div className={styles.form}>
            <div className={styles.item}>
            <label htmlFor=''>*USERNAME</label>
            <input type='text' name='name' onChange={onInputChange} value={newUser.name} placeholder = 'Insert name'/>
            {errorName === true? <span className={styles.error}>{' Insert a name without special characters or numbers.'}</span>: <span> Name correct!</span>}
            </div>
            <div className={styles.item}>
            <label htmlFor=''>*LASTNAME</label>
            <input type='text' name='lastName' onChange={onInputChange} value={newUser.lastName} placeholder = 'Insert lastname'/>
            {errorLastName === true? <span className={styles.error}>{' Insert a name without special characters or numbers.'}</span>: <span> Lastname correct!</span>}
            </div>
            <div className={styles.item}>
            <label htmlFor=''>*EMAIL</label>
            <input type='text' name='eMail' onChange={onInputChange} value={newUser.eMail} placeholder = 'Insert a valid e-mail'/>
            {errorEMail === true? <span className={styles.error}>{' Must be gmail.'}</span>: <span> E-mail correct!</span>}
            </div>
            <div className={styles.item}>
            <label htmlFor=''>*PASSWORD</label>
            <input type='text' name='password' onChange={onInputChange} value={newUser.password} placeholder = 'Insert a password'/>
            {errorPassword === true? <span className={styles.error}>{' Must be of 8 characters and can contain letters and/or numbers.'}</span>: <span> Password correct!</span>}
            </div>                       
            </div>
            <input className={styles.submit} type='submit' value='Register' disabled={ error? true : false}/>
        </form>
        </div>

}
