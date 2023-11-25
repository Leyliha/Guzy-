/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { publicRequest } from "../../utilities/request";

const NewReview = ({ setModal }) => {
  const [rating, setRating] = useState(0);
  const [hold, setHold] = useState(false);
  const nameRef = useRef("");
  const revRef = useRef("");
  const reviewTags = [
    "Experience",
    "Quality",
    "Taste",
    "Portion Size",
    "Atmosphere",
    "Service",
  ];
  const [tags, setTags] = useState([]);
  function checkTag(e) {
    if (tags.length > 0 && tags.includes(e)) {
      setTags(tags.filter((tag) => tag !== e));
    } else {
      setTags((prev) => {
        return [...prev, e];
      });
    }
  }
  const toSend = {
    user: nameRef.current.value,
    text: revRef.current.value,
    rating: rating,
    tags: tags,
  };
  const onSave = async (e) => {
    e.preventDefault();
    try {
      console.log(toSend);
      const res = await publicRequest.post("/api/review/", toSend);
      console.log(res);
      if (res.data) {
        setModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onRate = (x, type) => {
    if (type === "hover" && !hold) {
      setRating(x)
    } else if (type === "leave" && !hold) {
      setRating(0)
    } else if (type === "click") {
      setRating(x)
      setHold(true)
    }
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none ">
        <form className="w-full max-w-lg bg-white py-6 px-6 rounded absolute z-50">
          <div className="flex justify-between w-full">
            <h1 className="text-2xl mb-4 text-[#29AB87] font-medium">
              Share your experience!
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
                placeholder="John Doe"
                ref={nameRef}
              />
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-spec"
              >
                Review
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-spec"
                type="text"
                placeholder="No lactose..."
                ref={revRef}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 w-full py-2">
            {reviewTags.map((rev) => (
              <span
                key={rev}
                onClick={() => checkTag(rev)}
                className={`px-2 p-1 ${tags.includes(rev)
                  ? "hover:bg-purple-950"
                  : "hover:bg-emerald-500"
                  } ${tags.includes(rev) ? "bg-emerald-500" : "bg-purple-950"
                  } bg-opacity-30 cursor-pointer rounded`}
              >
                {rev}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-end">
            <div className="flex mt-10 text-orange-500">
              {[1, 2, 3, 4, 5].map((x) =>
                rating >= x ? (
                  <AiFillStar
                    key={x}
                    onMouseEnter={() => onRate(x, "hover")}
                    onMouseLeave={() => onRate(x, "leave")}
                    onClick={() => onRate(x, "click")}
                    className="cursor-pointer"
                    size={35}
                  />
                ) : (
                  <AiOutlineStar
                    key={x}
                    onMouseEnter={() => onRate(x, "hover")}
                    onMouseLeave={() => onRate(x, "leave")}
                    onClick={() => onRate(x, "click")}
                    className="cursor-pointer"
                    size={35}
                  />
                )
              )}
            </div>
            <button className="button" onClick={onSave}>
              Publish
            </button>
          </div>
        </form>
        <div
          className="opacity-25 fixed inset-0 z-40 bg-black"
          onClick={() => setModal(false)}
        ></div>
      </div>
    </>
  );
};

export default NewReview;
