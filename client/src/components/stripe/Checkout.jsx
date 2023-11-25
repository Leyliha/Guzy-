import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { publicRequest } from '../../utilities/request';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../utilities/Loader';
import { resetCart } from '../../redux/cartRedux';
import { useNavigate } from 'react-router-dom';
import DefaultForm from '../order/DefaultForm';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  console.log(cart)
  const [message, setMessage] = useState()
  const [status, setStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }
    console.log(clientSecret)
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setIsLoading(true)
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          setStatus(true)
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setStatus(false)
          break;
        default:
          setMessage("Something went wrong.");
          setStatus(false)
          break;
      }
    });

    setTimeout(() => setIsLoading(false), 2500)
  }, [stripe]);
  const order = async () => {
    setIsLoading(true);
    if (status && cart.name && cart.address && cart.phone) {
      try {
        const response = (await stripe.retrievePaymentIntent(clientSecret)).paymentIntent
        const payment = await publicRequest.post("/api/order/", {
          products: cart.products,
          stripeid: response.id,
          method: response.payment_method_types[0],
          sum: response.amount / 100,
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
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_CLIENT_URL}/processing`,
      },
    });

    if (result.error) {
      console.log(result.error.message);
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      }
      else {
        setMessage("An unexpected error occurred.");
      }

    };
  }
  useEffect(() => {
    order()
    setTimeout(() => setIsLoading(false), 2500)
  }, [status])


  return (
    <>
      {isLoading
        ? <Loader />
        : (

          // <form onSubmit={handleSubmit} className='mt-4' id='payment-form'>
          //   <div className='my-2'><label htmlFor="name" className="text-[15px] font-light text-[#30313D]">Name</label><input onChange={(e) => dispatch(setName(e.target.value))} defaultValue={cart.name} type="text" id="name" name="name" placeholder="Sherlock Holmes" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-[9.5px] px-4 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
          //   <div className='my-2'><label htmlFor="address" className="text-[15px] font-light text-[#30313D]">Address</label><input onChange={(e) => dispatch(setAddress(e.target.value))} defaultValue={cart.address} type="text" id="address" name="address" placeholder="Baker street 221B" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-[9.5px] px-4 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
          //   <div className='my-2'><label htmlFor="address" className="text-[15px] font-light text-[#30313D]">Phone Number</label>
          //   <PhoneInput
          //     placeholder="+123 (12) 34-56-78"
          //     defaultCountry='HU'
          //     value={cart.phone}
          //     onChange={(e) => dispatch(setPhone(e))} />
          //     <PaymentElement id='payment-element' /></div>

          //   <p className="mt-10 text-center text-sm font-semibold text-[#30313D]">By placing this order you agree to the <a href="#" className="whitespace-nowrap text-teal-400 underline hover:text-[#29AB87]">Terms and Conditions</a></p>
          //   <button type="submit" disabled={!stripe || !elements} className="mt-4 inline-flex w-full items-center justify-center rounded bg-[#29AB87] py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</button>
          //   {message && <h5 id="payment-message">{message}</h5>}
          // </form>
          <DefaultForm handleSubmit={handleSubmit} stripe={stripe} elements={elements} card={true} message={message} ><PaymentElement id='payment-element' /></DefaultForm>
        )}
    </>
  )
};

export default CheckoutForm;