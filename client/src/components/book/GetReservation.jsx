/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { publicRequest } from "../../utilities/request";
import moment from "moment/moment";

const GetReservation = ({ setModal }) => {
  const codeRef = useRef(null);
  const [reservations, setReservations] = useState([]);

  const getReservations = async () => {
    try {
      const res = await publicRequest.get(
        `/api/book/find/code/${codeRef.current.value}`
      );
      setReservations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none ">
      <div className="w-full max-w-lg bg-white py-6 px-6 rounded absolute z-50">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl mb-4 text-[#29AB87] font-medium">
            See your reservations!
          </h1>
          <GrClose
            type="button"
            className="cursor-pointer"
            onClick={() => setModal(false)}
          />
        </div>
        <div className="flex flex-wrap items-end -mx-3 mb-6">
          <div className="w-3/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Code
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="xxxxxxxxxxxxxxx"
              ref={codeRef}
            />
            {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
          </div>
          <div className="w-1/4">
            <button
              className="button"
              style={{ height: "46px" }}
              onClick={getReservations}
            >
              Send
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full py-2">
          {reservations.map((rev) => (
            <div key={rev._id} className="w-full">
              <h1 className="text-lg font-bold">Reservation ID: {rev.code}</h1>
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col">
                  <h1>{rev.user}</h1>
                  <h3>{rev.email}</h3>
                </div>
                <div className="flex flex-col">
                  <h1>{moment(rev.datetime).format("Do MMM YYYY, HH:mm")}</h1>
                  <h3>For {rev.qty} people</h3>
                </div>
                <div className="flex flex-col">
                  <h1>Special requests</h1>
                  <h3 className="font-semibold">{rev.specs}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="opacity-25 fixed inset-0 z-40 bg-black"
        onClick={() => setModal(false)}
      ></div>
    </div>
  );
};

export default GetReservation;
