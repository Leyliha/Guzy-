import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddress, setName, setPhone } from '../../redux/cartRedux'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const DefaultForm = ({ children, message, handleSubmit, card, stripe, elements }) => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  return (
    <form onSubmit={handleSubmit} className='mt-4' id='payment-form'>
      <div className='my-2'><label htmlFor="name" className="text-[15px] font-light text-[#30313D]">Name</label><input onChange={(e) => dispatch(setName(e.target.value))} defaultValue={cart.name} type="text" id="name" name="name" placeholder="Sherlock Holmes" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-[9.5px] px-4 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
      <div className='my-2'><label htmlFor="address" className="text-[15px] font-light text-[#30313D]">Address</label><input onChange={(e) => dispatch(setAddress(e.target.value))} defaultValue={cart.address} type="text" id="address" name="address" placeholder="Baker street 221B" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-[9.5px] px-4 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
      <div className='my-2'><label htmlFor="address" className="text-[15px] font-light text-[#30313D]">Phone Number</label>
        <PhoneInput
          placeholder="+123 (12) 34-56-78"
          defaultCountry='HU'
          value={cart.phone}
          onChange={(e) => dispatch(setPhone(e))} />
        {children}
      </div>
      <p className="mt-10 text-center text-sm font-semibold text-[#30313D]">By placing this order you agree to the <a href="#" className="whitespace-nowrap text-teal-400 underline hover:text-[#29AB87]">Terms and Conditions</a></p>
      <button type="submit" disabled={card && (!stripe || !elements)} className="mt-4 inline-flex w-full items-center justify-center rounded bg-[#29AB87] py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</button>
      {message && <h5 id="payment-message">{message}</h5>}
    </form>
  )
}

export default DefaultForm