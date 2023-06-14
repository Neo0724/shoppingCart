import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

export default function Login() {
    const navigate = useNavigate()

    const [ data, setData ] = useState({ userName: "", userPassword: ""})

    const [_, setCookies] = useCookies(["access_token"])
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/auth/login", { username: data.userName, password: data.userPassword})
            setCookies("access_token", response.data.token)
            localStorage.setItem("User ID", response.data.userID)
            alert("Logged in successfully")
            navigate("/shoppingCart")
        } catch (err) {
            alert(err)
        }
    }
  return (
    <AuthForm data={data} setData={setData} label="Login"/>
  )
}
