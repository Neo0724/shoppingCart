/* eslint-disable react/prop-types */
import { useContext } from "react"
import { CartContext } from "./App"
import axios from "axios"

export default function CartProduct({ CartProduct, SetCartProduct}) {
    const {cartProduct, setCartContext} = useContext(CartContext)
    let handleDecrease = async () => {
        SetCartProduct(prev => {
            let newProduct = prev.map(item => {
                if (item.id === CartProduct.id && item.selectedColor === CartProduct.selectedColor && item.selectedStorage === CartProduct.selectedStorage) {
                    if (item.quantity === 1) return item
                    return ({...item, quantity: item.quantity - 1})
                } else {
                    return item
                }
            })
            return newProduct
        })
        try {
            await axios.post("http://localhost:3000/cart/changeQuantity", { id: CartProduct.id, selectedColor: CartProduct.selectedColor, selectedStorage: CartProduct.selectedStorage, type: "Decrease"})
        } catch (err) {
            alert(err)
        }
    }

    let handleIncrease = async () => {
        SetCartProduct(prev => {
            let newProduct = prev.map(item => {
                if (item.id === CartProduct.id && item.selectedColor === CartProduct.selectedColor && item.selectedStorage === CartProduct.selectedStorage) {
                    return ({...item, quantity: item.quantity + 1})
                } else {
                    return item
                }
            })
            return newProduct
        })
        try {
            await axios.post("http://localhost:3000/cart/changeQuantity", { id: CartProduct.id, selectedColor: CartProduct.selectedColor, selectedStorage: CartProduct.selectedStorage, type: "Increase"})
        } catch (err) {
            alert(err)
        }
    }

    let handleDelete = async () => {
        let itemToDelete = cartProduct.filter(item => item.id === CartProduct.id && item.selectedColor === CartProduct.selectedColor && item.selectedStorage === CartProduct.selectedStorage)
        SetCartProduct(prev => {
            let newItem = prev.filter(item => item != itemToDelete[0])
            return newItem
        })
        try {
            await axios.post("http://localhost:3000/cart/delete", { id: itemToDelete[0].id, selectedColor: itemToDelete[0].selectedColor, selectedStorage: itemToDelete[0].selectedStorage })
            alert("Deleted Successfully")
      } catch (err) {
        alert(err)
      }
    }
    let totalPrice = 0;

    function calculateTotalPrice () {
        let productPrice = CartProduct.price;

        totalPrice = productPrice * CartProduct.quantity
    }
    
    calculateTotalPrice()

  return (
    <div className="cartProductContainer">
        <img src={`./${CartProduct.imgUrl}`} alt={CartProduct.name} className="productImage" />
        <div className="detailsContainer">
            <div className="cartProductName">Product: {CartProduct.name}</div>
            <div className="productPrice">Unit Price: RM {CartProduct.price}</div>
            {CartProduct.id !== 8? <div className="selectedStorageSize">Storage: {CartProduct.selectedStorage}</div> : null}
            {CartProduct.id !== 8? <div className="selectedColor">Color: {CartProduct.selectedColor}</div> : null}
            <div className="quantityContainer">
                <button className="decreaseBtn" onClick={() => handleDecrease()}>-</button>
                <div className="productQuantity">{CartProduct.quantity}</div>
                <button className="increaseBtn" onClick={(() => handleIncrease())}>+</button>
            </div>
            <div className="totalPrice">Total Price: RM {totalPrice.toFixed(2)}</div>
        </div>
        <button className="deleteBtn" onClick={() => handleDelete()}>Delete</button>
    </div>
  )
}
