import Item from './Item'
import useProduct from './useProduct'

export default function Home() {
    const [product, setProduct] = useProduct()

  return (
    <div className="homePage">
        <h1 className="homeTitle">Welcome</h1>
        <div className="titleDetail">Authorized Apple Reseller</div>
        <div className="itemContainer">
            {product.map(product => {
                let randomID = crypto.randomUUID()
                return <Item product={product} setProduct = {setProduct} key={randomID}/>
            })}
        </div>
    </div>
  )
}

