import React from 'react'
import './loader.css'

function Loader (props) {
  const { size, color } = props
  const loaderStyle = {
    position: 'relative',
    width: `${size}rem`,
    height: `${size}rem`,
    display: 'inline-block',
  }
  return (
    <div className="loader" style={ loaderStyle }>
      <div className="double-bounce1" style={ { backgroundColor: color } } />
      <div className="double-bounce2" style={ { backgroundColor: color } } />
    </div>
  )
}

Loader.defaultProps = {
  size: 1.4,
  color: '#106ba3',
}

export default Loader
