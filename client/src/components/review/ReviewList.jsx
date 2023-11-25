/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineStar, AiFillStar, AiOutlineShareAlt } from "react-icons/ai";
import { publicRequest } from "../../utilities/request";
import moment from "moment/moment";
import NewReview from "./NewReview";
const ReviewList = () => {
  const [modal, setModal] = useState(false);
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
    console.log(tags);
  }

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await publicRequest.get("/api/review/find");
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getReviews();
  }, []);
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "indigo",
    "pink",
    "lime",
    "orange",
    "gray",
  ];
  const getRevs = () => {
    const filtered = reviews.filter((rev) =>
      rev.tags.some((tag) => tags.includes(tag))
    );
    console.log(filtered);
    if (tags.length > 0) {
      return filtered;
    } else {
      return reviews;
    }
  };
  const getColor = (rev) =>
    (rev.color = colors[Math.floor(Math.random() * 10)]);

  return (
    <div className="bg-[#d9e9eb] flex justify-center items-start mt-20 min-h-screen p-4 w-full max-w-5xl mx-auto">
      <div className="w-full px-10 flex flex-col gap-2 text-white">
        <div className="flex items-center justify-between">
          <h1 className="py-5 text-4xl font-medium text-[#29AB87]">Reviews</h1>
          <button className="button" onClick={() => setModal(true)}>
            Leave a review
          </button>
        </div>
        <div className="text-lg text-gray-600">Sort by tags!</div>

        <div className="flex flex-wrap gap-2 w-full py-2">
          {reviewTags.map((rev) => (
            <span
              key={rev}
              onClick={() => checkTag(rev)}
              className={`px-2 p-1 ${
                tags.includes(rev)
                  ? "hover:bg-purple-950"
                  : "hover:bg-emerald-500"
              } ${
                tags.includes(rev) ? "bg-emerald-500" : "bg-purple-950"
              } bg-opacity-30 cursor-pointer rounded`}
            >
              {rev}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-14">
          {getRevs().map((rev) => (
            <div
              key={rev._id}
              className="flex flex-col gap-4 bg-[#29AB87] p-4 rounded"
            >
              <div className="flex justify justify-between">
                <div className="flex gap-2">
                  <div
                    className="w-7 h-7 flex items-center justify-center rounded-full"
                    style={{
                      backgroundColor: getColor(rev),
                    }}
                  >
                    {rev.user.charAt(0)}
                  </div>
                  <span>{rev.user}</span>
                </div>
                <div className="flex p-1 gap-1 text-orange-300">
                  {Array.from({ length: rev.rating }).map((x) => (
                    <AiFillStar key={x} className="cursor-pointer" />
                  ))}

                  {Array.from({ length: 5 - rev.rating }).map((x) => (
                    <AiOutlineStar key={x} className="cursor-pointer" />
                  ))}
                </div>
              </div>

              <div>{rev.text}</div>

              <div className="flex justify-between items-center">
                <span className="w-1/5">
                  {moment(rev.createdAt).format("Do MMM YYYY, HH:mm")}
                </span>
                <div className="flex flex-wrap gap-2 w-3/5 py-2">
                  {rev.tags.map((rev) => (
                    <span
                      key={rev}
                      className="px-2 p-1 hover:bg-emerald-500 bg-gray-950 bg-opacity-30 cursor-pointer rounded"
                    >
                      {rev}
                    </span>
                  ))}
                </div>
                <div className="w-1/5 flex justify-end">
                  <button className="p-1 px-2 flex items-center gap-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60 rounded">
                    <AiOutlineShareAlt /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal ? <NewReview setModal={setModal} /> : null}
    </div>
  );
};

export default ReviewList;
