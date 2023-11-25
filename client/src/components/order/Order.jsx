import { useDispatch, useSelector } from "react-redux"
import Stripe from "../stripe/Stripe"
import { useEffect, useState } from "react"
import { publicRequest } from "../../utilities/request"
import DefaultForm from "./DefaultForm"
import { useNavigate, useParams } from "react-router-dom"
import { resetCart } from "../../redux/cartRedux"

export default function Order() {
  const { type } = useParams()
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const total = cart?.products?.reduce((acc, item) => acc + item.price * item.qty, 0)
  const vat = (total / 10).toFixed(2)
  const amount = parseFloat(total) + parseFloat(vat)
  console.log(amount, total, vat)
  const [isLoading, setIsLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState(null)
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await publicRequest.post("/api/checkout/create-payment-intent", { amount });
        console.log(res)
        setClientSecret(res.data.clientSecret)
        console.log(clientSecret)
      } catch (error) {
        console.log(error)
      }
    }
    if (type === "card")
      createPaymentIntent()
  }, [type])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    if (cart.name && cart.address && cart.phone) {
      try {
        const payment = await publicRequest.post("/api/order/", {
          products: cart.products,
          method: type,
          sum: amount,
          address: cart.address,
          name: cart.name,
          phone: cart.phone
        })

        if (payment.data) {
          setTimeout(() => {
            setIsLoading(false);
          }, 2500)
          console.log(payment.data)
          dispatch(resetCart())
          navigate("/success")
        }
        else {
          console.log(payment)
          navigate("/error")
        }
      } catch (error) {
        console.log(error)
        navigate("/error")
      }
    }
    console.log("done")
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="grid min-h-[72.5vh] w-full grid-cols-2">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-1 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Place your order<span className="mt-2 block h-1 w-10 bg-[#29AB87] sm:w-20"></span></h1>
            {type === "card" && clientSecret ? <Stripe clientSecret={clientSecret} /> : type === "cash" ? <DefaultForm card={false} handleSubmit={handleSubmit} /> : null}
            {/* {clientSecret ? <Stripe clientSecret={clientSecret} /> : null} */}
          </div>
        </div>

        <div className="relative col-span-full flex h-fit min-h-[675px] flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-1 lg:py-24 bg-[#29AB87]">
          <h2 className="text-white text-2xl font-semibold">Order summary</h2>
          <div className="relative top-10">
            <ul className="space-y-5">
              {cart?.products?.map((item) =>
                <li key={item.name} className="flex justify-between">
                  <div className="inline-flex">
                    <img src={item.img} alt="" className="h-16 w-20" />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">{item.name}</p>
                      <p className="text-sm font-medium text-white text-opacity-80">{item.desc}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">{item.qty} x ${item.price.toFixed(2)}</p>
                </li>
              )}
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>${total.toFixed(2)}</span></p>
              <p className="flex justify-between text-sm font-medium text-white"><span>Vat: 10%</span><span>${vat}</span></p>
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
      </div>
    </div>

  )
}
