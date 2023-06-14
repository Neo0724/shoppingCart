import { useNavigate, Link } from "react-router-dom"
import { useContext } from "react";
import { CartContext } from "./App"
import { useCookies } from "react-cookie";
"/shoppingCart/loginAndRegister"



export default function Navbar() {
  const [ cookies, setCookies ] = useCookies(["access_token"])
  const navigate = useNavigate(); 
  const homeIcon = "home.png"
  const loginIcon = "login.png"
  const logoutIcon = "logout.png"

  const { cartProduct, setCartProduct } = useContext(CartContext)

  const logout = () => {
    setCookies("access_token", "")
    localStorage.removeItem("User ID")
    setCartProduct([])
    navigate("/shoppingCart/register")
  }
  
  return (
    <div className="navbar">
        <div className="storeName">Apple Reseller</div>
        <img src={`./${homeIcon}`} alt="Home Btn" className="homeBtn" onClick={() => navigate('./shoppingCart/')} />
        <img src="./shoppingcart.png" alt="Cart Btn" className="cartBtn" onClick={() => navigate('/shoppingCart/cart')} />
        {cartProduct.length ? <div className="cartNumber">{cartProduct.length}</div> : null}
        {!cookies.access_token? <img src={`./${loginIcon}`} alt="loginIcon" className="loginAndRegisterImg" onClick={() => navigate('/shoppingCart/register')}/>: <img src={`./${logoutIcon}`} alt="logoutIcon" className="logoutIcon" onClick={logout}/>}
    </div>


  )
}
