import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function Validation() {
    const {email, username} = useParams()
    const navigate = useNavigate()
    const eMail = email
    const location = useLocation()
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    console.log(location)
    let password = location.pathname.split('/').splice(4).join('/')
    console.log("password:", password)
    const [state, setState] = useState({})
    useEffect(()=> {
    
    axios.post(`${axios.defaults.baseURL}/api/v1/auth/register`, {email, username, password})
    .then(() => {
        setState({success: 1})
        Toast.fire({
            icon: 'success',
            title: 'User registered succesfully'
          })
        axios.post(`${axios.defaults.baseURL}/send-email-registered`, {eMail});
    })
    .then(() => {
        setTimeout(() => {
            navigate('/')
        }, 2000);
    })
    .catch((err) => {
        setState({error: 1})
        console.log(err)
        Swal.fire({
            icon: 'error',
            title: 'Oops try again!',
            text: 'Email already registered',
          })
    })

    }, [])
    return (
        <div>
            {state.error? <p>Register failed</p> : false}
            {state.success? <p>Register succesful! </p> : false}
        </div>
    )
}