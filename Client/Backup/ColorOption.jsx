/* eslint-disable react/prop-types */

export default function ColorOption({ color, handleColor }) {

  let handleClick = ( color, e ) => {
    e.preventDefault()
    handleColor(color)
    e.preventDefault()
  }

  let style = {
    color: color.isSelected? "white" : "black",
    background: color.isSelected? "grey" : "transparent",
  }

  return (
    <>
        <button type="button" style={style} onClick={(e) => handleClick(color.color, e)}className="colorBtn">{color.color}</button>
    </>
  )
}
