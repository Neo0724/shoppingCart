/* eslint-disable react/prop-types */
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

export default function AuthForm({ data, setData, label }) {
  const [cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  const handleIDChange = (e) => {
    setData(prev => {
      return ({ ...prev, userName: e.target.value})
    })
  }

  const handlePasswordChange = (e) => {
    setData(prev => {
      return ({ ...prev, userPassword: e.target.value})
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ( label === "Register" ) {
      try {
        await axios.post("http://localhost:3000/auth/register", { username: data.userName, password: data.userPassword  })
        alert("Register successful, please log in now")
      } catch (err) {
        alert("Please try again")
        console.log(err)
      }
    }  else {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", { username: data.userName, password: data.userPassword })
        setCookies("access_token", response.data.token)
        localStorage.setItem("User ID", response.data.userID)
        alert("Logged in successfully")
        navigate("/shoppingCart")
      } catch (err) {
        alert("Please try again")
        console.log(err)
      }
    }

  }

  return (
    <form action="POST" className="authContainer" onSubmit={(e) => handleSubmit(e)} autoComplete="off">
        <input type="text" placeholder="User ID" className="userIDInput" id="userID" onChange={handleIDChange} value={data.userName} required={true}/>
        <input type="password" placeholder="User Password" className="userPasswordInput" id="userPassword" onChange={handlePasswordChange} value={data.userPassword} required={true}/>
        <button className="submitBtn" type="submit">{label}</button>
        { label === "Register"? <div>Already have an account? <Link to="/shoppingCart/login">Log In</Link></div> : <div>Do not have an account? <Link to="/shoppingCart/register">Register Now</Link></div>}
    </form>
  )
}
