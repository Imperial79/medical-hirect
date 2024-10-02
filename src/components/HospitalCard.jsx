import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import location from "../assets/location.svg";
import { dbObject } from "../Helper/Constants";
import { Context } from "../Helper/ContextProvider";

function HospitalCard({ data }) {
  const { user } = useContext(Context);
  const [isFollowing, setisFollowing] = useState(data.isFollowing === "true");

  async function follow() {
    try {
      const formData = new FormData();
      formData.append("recruiterId", data.id);
      await dbObject.post("/recruiters/follow-recruiter.php", formData);

      setisFollowing(!isFollowing);
    } catch (error) {}
  }

  return (
    <div className="bg-white border p-5 mb-[20px] rounded-lg hover:drop-shadow-xl transition-all duration-200 text-black">
      <div className="flex gap-3 items-start">
        <div className="h-[100px] w-[100px] overflow-hidden rounded-lg flex-shrink-0">
          <img src={data.image} alt="CompanyImage" className="h-full w-full" />
        </div>

        <div className="flex flex-col gap-1 min-w-[100px]">
          <Link
            to={data.website}
            target="_blank"
            className="kTextButton font-medium tracking-[.5px]"
          >
            <p className="break-words">{data.companyName}</p>
          </Link>

          <div className="inline-flex items-center gap-2">
            <img src={location} alt="location-icon" className="h-3 w-3" />
            <p className="text-[12px]">
              {data.city}, {data.state}
            </p>
          </div>

          <div className="inline-flex items-center gap-1 text-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="font-medium">Point of Contact:</span>
            {data.pocName}
          </div>

          <div className="inline-flex items-center gap-1 text-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="font-medium">Since:</span>
            {new Date(data.date).toLocaleDateString()}
          </div>
        </div>
      </div>
      {data.bio.length > 5 && (
        <>
          <p className="text-[12px] text-black font-semibold mt-2">About</p>
          <p className="text-sm max2lines mb-2">{data.bio}</p>
        </>
      )}
      {user && <FollowButton follow={follow} isFollowing={isFollowing} />}
    </div>
  );
}

export default HospitalCard;

function FollowButton({ follow, isFollowing }) {
  return (
    <button
      onClick={follow}
      className={`flex gap-2 items-center rounded-full px-3 py-1.5 text-[12px] font-medium ${
        isFollowing ? "bg-transparent text-black" : "bg-black text-white"
      }`}
    >
      {isFollowing ? (
        <>
          <svg
            onClick={follow}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clipRule="evenodd"
            />
          </svg>
          Unsubscribe
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          Subscribe
        </>
      )}
    </button>
  );
}
