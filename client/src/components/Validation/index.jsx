import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

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

    axios.post(`${axios.defaults.baseURL}/api/v1/auth/register`, {email, username, password})
    .then(() => {
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
    return (
        <div>
            Register succesful!
        </div>
    )
}