import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { CartContext } from "./App"


export default function Navbar() {
  const navigate = useNavigate(); 
  const img = "home.png"
  const { cartProduct, setCartProduct } = useContext(CartContext)
  
  return (
    <div className="navbar">
        <div className="storeName">Apple Reseller</div>
        <img src={`./${img}`} alt="Home Btn" className="homeBtn" onClick={() => navigate('./shoppingCart/')} />
        <img src="./shoppingcart.png" alt="Cart Btn" className="cartBtn" onClick={() => navigate('/shoppingCart/cart')} />
        {cartProduct.length ? <div className="cartNumber">{cartProduct.length}</div> : null}
    </div>
  )
}
