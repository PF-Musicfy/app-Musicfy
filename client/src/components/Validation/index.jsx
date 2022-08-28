import { useParams } from "react-router-dom";
import axios from "axios";

export default function Validation() {
    const {email, username, hashPassword} = useParams()
    const eMail = email
    const password = hashPassword
    axios.post(`${axios.defaults.baseURL}/api/v1/auth/register`, {email, username, password})
    .then(() => {
        axios.post(`${axios.defaults.baseURL}/send-email-registered`, eMail);
    })
    return (
        <div>
            Register succesful!
        </div>
    )
}