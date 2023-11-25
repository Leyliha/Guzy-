import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='mt-20 flex items-center justify-center h-[70vh] flex-col gap-10'><h1 className='text-5xl text-red-500'>Error happened while ordering</h1> <h3 className='text-2xl'>Please try again!</h3><Link className='text-xl text-[#320f4e]' to={"/"}>Back to Main Page</Link></div>
  )
}

export default ErrorPage