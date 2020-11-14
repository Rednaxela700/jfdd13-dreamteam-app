import React from 'react'
import Loader from "react-loader-spinner";


export const ShowLoader = () => {
  const loaderStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh'
  }
  return (
    <div style={loaderStyles}>
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={0}
      />
    </div>
  )
}