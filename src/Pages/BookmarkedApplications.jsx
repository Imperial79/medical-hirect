import React, { useEffect, useState } from "react";
import Scaffold from "../components/Scaffold";
import noDataIcon from "../assets/no-data.jpg";
import { dbObject } from "../Helper/Constants";
import JobCard from "../components/JobCard";

function BookmarkedApplications() {
  const [loading, setloading] = useState(false);
  const [pageNo, setpageNo] = useState(0);
  const [bookmarkedDataList, setbookmarkedDataList] = useState([]);

  // -------------functions----------->

  async function fetchBookmarked() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("pageNo", pageNo);
      const response = await dbObject.post(
        "/vacancy/fetch-bookmarked-vacancies.php",
        formData
      );
      if (!response.data.error) {
        setbookmarkedDataList(response.data.response);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }
  useEffect(() => {
    fetchBookmarked();
  }, []);

  return (
    <Scaffold isLoading={loading}>
      <div className="pt-20">
        <h1 className="mt-5 md:text-[30px] text-[30px] text-center font-semibold md:font-medium text-black mb-10">
          Bookmarked Applications
        </h1>

        {bookmarkedDataList.length > 0 ? (
          bookmarkedDataList.map((data, index) => (
            <div key={index}>
              <JobCard data={data} />
            </div>
          ))
        ) : (
          <div className="h-[600px] w-[600px] mx-auto">
            <img src={noDataIcon} alt="no-data" className="object-contain" />
          </div>
        )}
      </div>
    </Scaffold>
  );
}

export default BookmarkedApplications;
