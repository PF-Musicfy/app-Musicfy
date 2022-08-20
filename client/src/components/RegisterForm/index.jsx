import { useNavigate } from 'react-router-dom'
// import { fetchUsers } from '../store/actions'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './RegisterForm.module.css'
import axios from 'axios'

export default function RegisterForm() {
    const [newUser, setNewUser] = useState({name: '', eMail: '', password: '', token: '', key: ''})
    // const users = useSelector((state) => state.users)
    let navigate = useNavigate()
    let error = true
    let errorName = false
    let errorToken = false
    let errorEMail = false
    let errorPassword = false
    let userNames = []

    if(newUser.name.length === 0 || /[^a-zñáéíóú]/i.test(newUser.name) === true) {
        errorName = true
    }
    if(newUser.key !== newUser.token) {
        errorToken = true
    }
    if(newUser.eMail.length === 0 || /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(newUser.eMail) === false) {
        errorEMail = true
    }

    if(newUser.password.length !== 8 || /[^a-z0-9ñ]/i.test(newUser.password) === true) {
        errorPassword = true
    }

    if (errorName === false && errorToken === false && errorEMail === false && errorPassword === false) {
        error = false
    }

    function onClick(e) {
        e.preventDefault()
        navigate(-1)
    }

    function onInputChange(e) {
        e.preventDefault()         
        setNewUser({...newUser, [e.target.name]: e.target.value})
        console.log(newUser)
    }

    function keyClick(e) {
        e.preventDefault() 
        console.log(newUser)
        axios.post('http://localhost:5000/send-email', newUser)
        .then((token) => {            
            setNewUser({...newUser, token: token.data})
            console.log(token.data)
            alert('Key generated and sent to your email')
        })
        .catch((error)=> {
            console.log(error)
        })
        
    }

    function onSubmit(e) {
        e.preventDefault()      
        axios.post('http://localhost:5000/register', {username: newUser.name, email: newUser.eMail, password: newUser.password})
        .then(() => {
            alert('User registered succesfully')
            setNewUser({name: '', eMail: '', password: '', token: '', key: ''})
                navigate(-1)
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    return <div className={styles.create}>
        <button className={styles.back} onClick={onClick}>Back</button>        
        <form onSubmit={(e)=> onSubmit(e)} >
            <div className={styles.form}>
            <div className={styles.item}>
            <label htmlFor=''>*USERNAME </label>
            <input type='text' name='name' onChange={onInputChange} value={newUser.name} placeholder = 'Insert name'/>
            {errorName === true? <span className={styles.error}>{' Insert a name without special characters or numbers.'}</span>: <span> Name correct!</span>}
            </div>
            <div className={styles.item}>
            <label htmlFor=''>*EMAIL </label>
            <input type='text' name='eMail' id='eMail' onChange={onInputChange} value={newUser.eMail} placeholder = 'Insert a valid e-mail'/>
            {errorEMail === true? <span className={styles.error}>{' Must be a valid email.'}</span>: <span> E-mail correct!</span>}
            </div>
            <div className={styles.item}>
            <label htmlFor=''>*PASSWORD </label>
            <input type='text' name='password' onChange={onInputChange} value={newUser.password} placeholder = 'Insert a password'/>
            {errorPassword === true? <span className={styles.error}>{' Must be of 8 characters and can contain letters and/or numbers.'}</span>: <span> Password correct!</span>}
            </div>
            {newUser.token.length > 0?<div className={styles.item}>
            <label htmlFor=''>*KEY </label>
            <input type='text' name='key' onChange={onInputChange} value={newUser.key} placeholder = 'Insert key'/>
            {errorToken === true? <span className={styles.error}>{' Insert the key sent to your email.'}</span>: <span> Key correct!</span>}
            </div>: <button className={styles.register} onClick={keyClick} value='ObtainKey' disabled={errorEMail?true:false}> Click and obtain key to register! </button>}
            </div>
            <input className={styles.submit} type='submit' value=' Register ' disabled={ error? true : false}/>
        </form>
        </div>

}
