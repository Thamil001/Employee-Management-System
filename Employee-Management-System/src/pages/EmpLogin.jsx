import React from 'react'
import style from '../css/Login.module.css'
import { Cart } from '../components/Cart';

export const EmpLogin = () => {
  const { cart } = style;
  
  return (
    <>
      <div className={cart}>
        <Cart />
      </div>
    </>
  )
}

