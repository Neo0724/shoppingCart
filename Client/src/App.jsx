import { createContext, useState, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'
import Cart from './Cart'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import axios from 'axios'
import { useCookies } from 'react-cookie'

export const CartContext = createContext()


export default function App() {
  const [cookies, setCookies] = useCookies(["access_token"])

  const [cartProduct, setCartProduct] = useState([])

  let fetchData = async () => {
    const userID = localStorage.getItem("User ID")

    try {
      const response = await axios.get(`http://localhost:3000/cart/get/${userID}`, { userOwner: userID })
      setCartProduct(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    cookies.access_token ? fetchData() : null

  }, [cookies.access_token])



  return (
    <CartContext.Provider value={{ cartProduct, setCartProduct }}>
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path='/shoppingCart' element={<Home />}></Route>
          <Route path='/shoppingCart/cart' element={<Cart />}></Route>
          <Route path='/shoppingCart/register' element={<Register />}></Route>
          <Route path='/shoppingCart/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  )
}


