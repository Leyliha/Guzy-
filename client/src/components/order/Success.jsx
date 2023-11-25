import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='mt-20 flex items-center justify-center h-[70vh] flex-col gap-10'><h1 className='text-5xl text-[#29ab87]'>Your order has been placed successfully!</h1> <h3 className='text-2xl'>You can sit back and relax until your order is delivered!</h3><Link className='text-xl text-[#320f4e]' to={"/"}>Back to Main Page</Link></div>
  )
}

export default Success