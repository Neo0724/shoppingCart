import { useContext, useEffect, useState } from "react"
import { CartContext } from "./App"
// import axios from 'axios'
import CartProduct from "./CartProduct"

export default function Cart() {
  const { cartProduct, setCartProduct } = useContext(CartContext)
  // const [ data, setData ] = useState([{}])
  // useEffect(() => {
  //     async function fetchData () {
  //       try {
  //         const response = await axios.get('http://localhost:3000/api/cartItems')
  //         setData(response.data)
  //         console.log(response)
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     }

  //     fetchData()
  // }, [cartProduct]) 


  let totalCartPrice = 0;
  cartProduct.map(item => {
    let price = item.price * item.quantity
    totalCartPrice += price
  })

  return (
    <div className="cartContainer">
      <h2 className="cardTitle">Items that have been added to your cart ...</h2>
      {cartProduct.map(item => {
        let randomID = crypto.randomUUID()
        return <CartProduct CartProduct={item} SetCartProduct={setCartProduct} key={randomID} />
      })}
      {cartProduct.length !== 0? <div className="totalCartPrice">Total Price: RM {(totalCartPrice).toFixed(2)}</div> : <div className="emptyCart" >Empty Cart</div>}
    </div>
  )
}
