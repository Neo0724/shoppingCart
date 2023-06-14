import { useState } from "react";
import AuthForm from "./AuthForm";

export default function Register() {
    const [ data, setData ] = useState({ userName: "", userPassword: ""})


  return (
     <AuthForm data={data} setData={setData} label="Register"/>
  )
}
