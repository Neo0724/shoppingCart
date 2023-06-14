/* eslint-disable react/prop-types */
import { useContext } from "react"
import { CartContext } from "./App"

export default function CartProduct({ CartProduct, SetCartProduct}) {
    const {cartProduct, setCartContext} = useContext(CartContext)
    let handleDecrease = () => {
        SetCartProduct(prev => {
            let newProduct = prev.map(item => {
                if (item.id === CartProduct.id) {
                    if (item.quantity === 1) return item
                    return ({...item, quantity: item.quantity - 1})
                } else {
                    return item
                }
            })
            return newProduct
        })
    }

    let handleIncrease = () => {
        SetCartProduct(prev => {
            let newProduct = prev.map(item => {
                if (item.id === CartProduct.id) {
                    return ({...item, quantity: item.quantity + 1})
                } else {
                    return item
                }
            })
            return newProduct
        })
    }

    let handleDelete = () => {
        let itemToDelete = cartProduct.filter(item => item.id !== CartProduct.id || item.selectedColor !== CartProduct.selectedColor || item.selectedStorage !== CartProduct.selectedStorage)
        return SetCartProduct(itemToDelete)
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
