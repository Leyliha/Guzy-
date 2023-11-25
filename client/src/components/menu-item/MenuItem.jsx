/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import QtyRegulation from "./QtyRegulation";

const MenuItem = ({ dish }) => {
  const [vis, setVis] = useState(false);
  return (
    <div
      key={dish._id}
      className="menu__content snap-center snap-always relative mr-4"
    >
      <img src={dish.img} alt="" className="menu__img" />
      <h3 className="menu__name">{dish.name}</h3>
      <div className="relative w-full">
        <h3
          onMouseEnter={() => setVis(dish._id)}
          onMouseLeave={() => setVis(null)}
          className="menu__detail w-full whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {dish.description}
        </h3>
        {vis === dish._id ? (
          <h3 className="text-sm absolute bottom-8 left-0 bg-emerald-500 text-white p-3 z-[999] rounded-lg opacity-100 transition-all">{dish.description}</h3>
        ) : <h3 className="opacity-0 transition-all absolute bottom-8 left-0"></h3>}
      </div>
      <span className="menu__preci">${dish.price.toFixed(2)}</span>
      <div className="text-black"><QtyRegulation dish={dish} /></div>
    </div>
  );
};

export default MenuItem;
