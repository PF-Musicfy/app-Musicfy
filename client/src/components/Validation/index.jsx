import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

export default function Validation() {
    const {email, username} = useParams()
    const eMail = email
    const location = useLocation()
    console.log(location)
    let password = location.pathname.split('/').splice(4).join('/')
    console.log("password:", password)

    axios.post(`${axios.defaults.baseURL}/api/v1/auth/register`, {email, username, password})
    .then(() => {
        axios.post(`${axios.defaults.baseURL}/send-email-registered`, {eMail});
    })
    return (
        <div>
            Register succesful!
        </div>
    )
}