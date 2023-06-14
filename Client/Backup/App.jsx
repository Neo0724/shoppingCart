import { createContext, useState, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'
import Cart from './Cart'
import Home from './Home'

export const CartContext = createContext()


export default function App() {

  const [cartProduct, setCartProduct] = useState([])

  return (
    <CartContext.Provider value={{ cartProduct, setCartProduct }}>
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path='/shoppingCart' element={<Home />}></Route>
          <Route path='/shoppingCart/cart' element={<Cart />}></Route>
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  )
}


