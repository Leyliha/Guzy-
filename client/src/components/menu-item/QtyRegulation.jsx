import React from 'react'
import { BiCartAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../../redux/cartRedux";

const QtyRegulation = ({ dish }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products);
  return (
    <>{cart.find((item) => item._id === dish._id) ? (
      <div className="absolute bottom-0 right-0 flex gap-2 items-center">
        <button
          className="bg-[#29AB87] text-white hover:bg-[#320f4e] transition-all px-4 py-1.5 rounded-bl-lg rounded-tr-lg"
          onClick={() => dispatch(removeItem(dish._id))}
        >
          -
        </button>
        <span className="font-semibold text-lg">
          {cart.find((item) => item._id === dish._id).qty}
        </span>
        <button
          className="bg-[#29AB87] text-white hover:bg-[#320f4e] transition-all px-4 py-1.5 rounded-ee-lg rounded-ss-lg"
          onClick={() =>
            dispatch(
              addToCart({
                _id: dish._id,
                name: dish.name,
                img: dish.img,
                price: dish.price,
                desc: dish.description,
                qty: 1,
              })
            )
          }
        >
          +
        </button>
      </div>
    ) : (
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: dish?._id,
              name: dish.name,
              img: dish.img,
              price: dish.price,
              desc: dish.description,
              qty: 1,
            })
          )
        }
        className="button menu__button"
      >
        <BiCartAlt size={20} color="white" />
      </button>
    )}</>
  )
}

export default QtyRegulation