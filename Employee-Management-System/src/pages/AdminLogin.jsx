import React from 'react'
import style from '../css/Login.module.css'
import { AdminLoginCart } from '../components/AdminLoginCart';

export const AdminLogin = () => {
  const { cart } = style;
  return (
    <>
      <div className={cart}>
        < AdminLoginCart/>
      </div>
    </>
  )
}

