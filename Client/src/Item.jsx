
/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
import { useContext, useEffect } from "react"
import { CartContext } from "./App"
import StorageOption from "./StorageOption"
import ColorOption from "./ColorOption"
import { useCookies } from "react-cookie"
import axios from "axios"

export default function Item({ product, setProduct}) {
    const {cartProduct, setCartProduct} = useContext(CartContext)
    const [ cookies, setCookies ] = useCookies(["access_token"])

    let handleIncrease = () => {
        setProduct(prev => {
            let newProduct = prev.map(item => {
                if (item.id === product.id) {
                    return ({...item, quantity: item.quantity + 1})
                } else {
                    return item
                }
            })
            return newProduct
        })
    }

    let handleDecrease = () => {
        setProduct(prev => {
            let newProduct = prev.map(item => {
                if (item.id === product.id) {
                    if (item.quantity === 1) return item
                    return ({...item, quantity: item.quantity - 1})
                } else {
                    return item
                }
            })
            return newProduct
        })
    }

    let handleStoragePrice = ( price, size, e ) => {
        e.preventDefault()
        let newStorageOption = product.storageSize.map(item => {
            if (item.size === size) {
                return {...item, isSelected: !item.isSelected}
            } else {
                return {... item, isSelected: false}
            }
        })

        let selected = newStorageOption.find(item => item.isSelected === true)

        setProduct(prev => {
            let newProduct = prev.map(prev => {
                if (prev.id === product.id) {
                    return ({...prev, price: selected ? price : product.displayPrice, selectedStorage: selected ? size : null, storageSize: newStorageOption})
                } return prev
            })

            return newProduct
        })
        e.preventDefault()

    }

    let handleColor = ( color ) => {
        let newColorOption = product.color.map(item => {
            if (item.color === color) {
                return {...item, isSelected: !item.isSelected}
            } else {
                return {... item, isSelected: false}
            }
        })

        let selected = newColorOption.find(item => item.isSelected === true)

        setProduct(prev => {
            let newProduct = prev.map(prev => {
                if (prev.id === product.id) {
                    return ({...prev, selectedColor: selected ? color : null, color: newColorOption })
                } return prev
            })

            return newProduct
        })

    }

    let handleCartProduct = () => {
      return new Promise((resolve, reject) => {
        if (!cookies.access_token) {
          alert("Please log in to add the item to the cart");
          reject(new Error("User not logged in"));
          return;
        }

        if (product.selectedColor === null || product.selectedStorage === null) {
          alert("Please select a color or a storage size...");
          reject(new Error("Incomplete product selection"));
          return;
        }

        const userId = localStorage.getItem("User ID");
        let productWithId = { ...product, userOwner: userId, };

        const existingItem = cartProduct.find(
          (cartProduct) => cartProduct.id === product.id
        );

        if (!existingItem) {
          let finalCart = [...cartProduct, productWithId];
          setCartProduct(finalCart);
          resolve(productWithId);

        } else if (
          existingItem.selectedColor !== product.selectedColor ||
          existingItem.selectedStorage !== product.selectedStorage
        ) {
          let finalCart = [...cartProduct, productWithId];
          setCartProduct(finalCart);
          resolve(productWithId);
        } else {
          let finalCart = cartProduct.map((item) => {
            if (
              item.randomID === product.randomID
            ) {
              return { ...item, quantity: product.quantity + item.quantity };
            } else {
              return item;
            }
          });

          setCartProduct(finalCart);
          resolve(productWithId);
        }
      });
    };


    let handleAddToCart = async (e) => {
        e.preventDefault()
        try {
            const updatedCartProduct = await handleCartProduct();
            await axios.post("http://localhost:3000/cart/create", { ...updatedCartProduct })
        } catch (err) {
            console.log(err)
        }

    }

  return (
    <div className="productContainer">
        <img src={`./${product.imgUrl}`} alt={product.name} className="productImage" />
        <div className="productName">{product.name}</div>
        <div className="productPrice">RM {product.price}</div>
        {product.id !== 8 ? 
        <div className="storageContainer"> Storage: 
        <div className="storageOption">
        {product.storageSize.map(item => {
            let randomID = crypto.randomUUID()
            return <StorageOption storageOption={item} handleStoragePrice={( price, size, e ) => handleStoragePrice( price, size, e )} key={randomID}/>
        })} </div>
        </div> : null}
        {product.id !== 8 ? 
        <div className="colorContainer">
            <span className="colorTxt">Color:</span>
            <div className="colorOption"> {product.color.map(color => {
                let randomID = crypto.randomUUID()
                return <ColorOption color={color} handleColor={(color) => handleColor(color)}key={randomID}/>
        })} </div>
        </div> : null}
        <div className="quantityContainer">
            <button className="decreaseBtn" onClick={() => handleDecrease()}>-</button>
            <div className="productQuantity">{product.quantity}</div>
            <button className="increaseBtn" onClick={() => handleIncrease()}>+</button>
        </div>
        <button className="addBtn" onClick={(e) => handleAddToCart(e)}>Add To Cart</button>
    </div>
  )
}
