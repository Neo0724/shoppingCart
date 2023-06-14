/* eslint-disable react/prop-types */
function StorageOption({ storageOption, handleStoragePrice }) {
  const { size, price } = storageOption

  const handleClick = (e) => {
    e.preventDefault()
    handleStoragePrice(price, size, e)
    e.preventDefault()
  }
 


  let style = {
    color: storageOption.isSelected? "white" : "black",
    background: storageOption.isSelected? "grey" : "transparent"
  }

  return (
    <>
        <button type="button" style={style} onClick={handleClick} className="sizeBtn">{size}</button>
    </>
  )
}

export default StorageOption