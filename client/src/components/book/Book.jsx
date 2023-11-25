/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { publicRequest } from "../../utilities/request";
import { FaCopy } from "react-icons/fa";

const Book = ({ setModal }) => {
  const [code, getCode] = useState(false)
  const [info, setInfo] = useState(null)
  const [copy, setCopy] = useState(false)
  const nameRef = useRef("");
  const emailRef = useRef("");
  const [timeRef, setTimeRef] = useState("")
  const peopleRef = useRef(0);
  const specRef = useRef("");
  const [noPlaces, setNoPlaces] = useState(false)

  useEffect(() => {
    const today = new Date(timeRef)
    var startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    console.log(startOfToday)
    const getReservationsForToday = async () => {
      try {
        const res = await publicRequest.post("/api/book/find", { time: startOfToday })
        if (res.data.length > 50) {
          setNoPlaces(true)
          console.log(noPlaces)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (timeRef)
      getReservationsForToday()
  }, [timeRef])


  const onSave = async (e) => {
    e.preventDefault();
    const toSend = {
      user: nameRef.current?.value,
      email: emailRef.current?.value,
      datetime: timeRef,
      qty: peopleRef.current?.value,
      specs: specRef.current?.value,
    };
    if (!noPlaces) {
      try {
        console.log(toSend);
        const res = await publicRequest.post("/api/book/", toSend);
        console.log(res);
        if (res.data) {
          setInfo(res.data.code)
          getCode(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onCopy = async () => {
    navigator.clipboard.writeText(info);
    try {
      const copied = await navigator.clipboard.readText();
      if (copied === info) {
        setCopy(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none ">
        {
          code ? <div className="flex flex-col justify-between items-center w-full gap-6 max-w-lg bg-white p-12 rounded absolute z-50">
            <div className="flex items-start justify-between"><h1 className="text-5xl text-[#29AB87]">Here is your confirmation code! </h1> <GrClose
              type="button"
              className="cursor-pointer h-20 w-20"
              onClick={() => setModal(false)}
            /></div>
            <h3 className="text-2xl">Please save it, to retrieve your reservation information later</h3>
            <div className="h-[64px] border border-[#29AB87] rounded-lg flex flex-row-reverse w-full justify-between items-center">
              <button className={`rounded-e-lg h-full w-[60px] ${copy ? "bg-white" : "bg-[#29AB87]"} text-xl text-white flex items-center justify-around`} data-te-clipboard-init
                data-te-clipboard-target="#code"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={onCopy}
              >
                {copy ? <span className="text-[#29AB87]">Copied</span> : <FaCopy />}
              </button>
              <span className="text-4xl pl-4" data-te-clipboard-text={info} id="code">{info}</span>
            </div>
          </div>
            : <form className="w-full max-w-lg bg-white py-6 px-6 rounded absolute z-50">
              <div className="flex justify-between w-full">
                <h1 className="text-2xl mb-4 text-[#29AB87] font-medium">
                  Make a reservation!
                </h1>
                <GrClose
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setModal(false)}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    ref={nameRef}
                    placeholder="John Doe"
                  />
                  {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="email"
                    ref={emailRef}
                    placeholder="john@doe.com"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Date & Time
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="datetime-local"
                    onChange={(e) => setTimeRef(e.target.value)}
                    placeholder="DD/MM/YYYY, hh:mm"
                  />
                  <p className="text-gray-600 text-xs italic">
                    {noPlaces ? <span className="text-red-400">No places available for this date!</span> : "Make it as long and as crazy as you'd like"}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-people"
                  >
                    № of people
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-people"
                    type="number"
                    placeholder="3"
                    ref={peopleRef}
                    min={0}
                  />
                </div>
                <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-spec"
                  >
                    Special requests
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-spec"
                    type="text"
                    ref={specRef}
                    placeholder="No lactose..."
                  />
                </div>
                <div className="flex justify-end w-full mr-3 mt-5">
                  {" "}
                  <button className="button " onClick={onSave}>Save</button>
                </div>
              </div>
            </form>}

        <div
          className="opacity-25 fixed inset-0 z-40 bg-black"
          onClick={() => setModal(false)}
        ></div>
      </div>

    </>
  );
};

export default Book;
