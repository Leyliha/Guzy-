import React, { useEffect, useRef, useState } from "react";
import { publicRequest } from "../../utilities/request";
import MenuItem from "../menu-item/MenuItem";
import { IoCloseCircleOutline } from "react-icons/io5";

const Menu = () => {
  const [cats, setCats] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await publicRequest.get(`/api/category/find`);
        setCats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCats();
  }, []);
  useEffect(() => {
    async function getDishes() {
      try {
        const res = await publicRequest.get(
          selectedCat
            ? `/api/product/find?category=${selectedCat}`
            : "/api/product/find"
        );
        setDishes(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDishes();
  }, [selectedCat]);
  const filterCats = () => {
    if (!search) {
      return cats;
    } else {
      const filtered = cats.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
      );
      return filtered;
    }
  };
  const clear = () => {
    setSelectedCat(null);
    setSearch("");
  };
  return (
    <div className="flex w-full max-w-6xl mx-auto mt-20 gap-10">
      <div className="flex flex-col h-fit p-3 bg-white shadow w-60 mt-12 rounded-lg">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">Categories</h2>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center py-4">
              <button
                type="submit"
                className="p-2 focus:outline-none focus:ring"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {filterCats().map((cat) => (
                <li
                  key={cat._id}
                  className={`rounded-sm hover:bg-emerald-500 ${selectedCat === cat._id ? "bg-emerald-500 text-white" : ""} hover:text-white`}
                >
                  <a
                    href="#"
                    onClick={() => setSelectedCat(cat._id)}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="rounded-full h-7 w-7"
                    />
                    <span>{cat.name}</span>
                  </a>
                </li>
              ))}
              <li className="rounded-sm hover:bg-emerald-500 hover:text-white">
                <a
                  href="#"
                  onClick={clear}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <IoCloseCircleOutline size={28} />
                  <span>Clear</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12">
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          {dishes.map((dish) => (
            <MenuItem key={dish._id} dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
