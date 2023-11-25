import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetCart } from '../../redux/cartRedux';
import QtyRegulation from '../menu-item/QtyRegulation';

function Drawer({ isOpen, setIsOpen }) {
  const cart = useSelector((state) => state.cart.products)
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  const vat = (total / 10).toFixed(2)
  const dispatch = useDispatch()
  console.log(cart)
  return (
    <main
      className={
        " fixed overflow-hidden z-[101] bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg flex flex-col space-y-6 overflow-y-auto h-full pr-0">
          <div className="relative col-span-full w-full flex h-full min-h-[675px] flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-1 bg-[#393939]">
            <h2 className="text-white text-2xl font-semibold flex w-full justify-between items-center">Order summary {cart.length > 0 ? <button className='button text-sm' onClick={() => dispatch(resetCart())}>Reset cart</button> : null}</h2>

            <div className="relative top-10 h-full">
              <div className='flex flex-col justify-between h-full'>
                <ul className="space-y-5">
                  {cart.map((item) =>
                    <li key={item.name} className="flex justify-between relative">
                      <div className="inline-flex">
                        <img src={item.img} alt="" className="h-16 w-20" />
                        <div className="ml-3 text-white">
                          <p className="text-base font-semibold text-white">{item.name}</p>
                          <p className="text-sm font-medium text-white text-opacity-80">{item.desc}</p>
                          <QtyRegulation dish={item} />
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">{item.qty} x ${item.price.toFixed(2)}</p>
                    </li>
                  )}
                </ul>

                <div className="space-y-2">
                  <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                  <p className="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>${total.toFixed(2)}</span></p>
                  <p className="flex justify-between text-sm font-medium text-white"><span>Vat: 10%</span><span>${vat}</span></p>
                  <h1 className='text-white font-semibold text-2xl'>Proceed to payment:</h1>
                  <div className='flex flex-col gap-3 py-4'>
                    <Link to={"/order/card"} onClick={() => setIsOpen(false)} className='button w-full text-center'>Pay with card</Link>
                    <Link to={"/order/cash"} onClick={() => setIsOpen(false)} className='button w-full text-center'>Pay with cash</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-10 text-white">
              <h3 className="mb-5 text-lg font-bold">Support</h3>
              <p className="mt-2 text-sm font-semibold">+0 123 45 67  <span className="font-light">(International)</span></p>
              <p className="mt-2 text-sm font-semibold">+0 01 01 02 <span className="font-light">(Local)</span></p>
              <p className="mt-2 text-sm font-semibold">turkmenfood@email.com <span className="font-light">(Email)</span></p>
              <p className="mt-2 text-xs font-medium">Call us now for payment related issues</p>
            </div>
          </div>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}

export default Drawer;