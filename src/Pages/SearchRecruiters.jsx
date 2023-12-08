import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import HospitalCard from "../components/HospitalCard";
import { dbObject } from "../Helper/Constants";
import Scaffold from "../components/Scaffold";

function SearchRecruiters() {
  const [loading, setloading] = useState(false);
  const [pageNo, setpageNo] = useState(0);
  const [searchKey, setsearchKey] = useState(null);
  const [recruiterList, setrecruiterList] = useState([]);

  // --------functions--------->

  async function fetchRecruitersList() {
    try {
      setloading(true);
      const formData = new FormData();

      formData.append("pageNo", pageNo);
      formData.append("searchKey", searchKey);
      formData.append("city", "");
      formData.append("state", "");
      const response = await dbObject.post(
        "/recruiters/fetch-recruiters.php",
        formData
      );
      console.log(response.data);
      if (!response.data.error) {
        setrecruiterList(response.data.response);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchRecruitersList();
  }, []);

  return (
    <Scaffold isLoading={loading}>
      <Hero
        title="Search Recruiters"
        subtitle="Search by thousands of reputed recruiters"
        buttonLabel="Search recruiter"
      />
      <div className="pb-10 md:px-20 px-5 text-black">
        <div className="my-5 md:w-[80%] mx-auto">
          <h1>Search results for "UCLA Health"</h1>
        </div>
        {recruiterList.map((data, index) => (
          <div key={data.id}>
            <HospitalCard data={data} />
          </div>
        ))}
      </div>
    </Scaffold>
  );
}

export default SearchRecruiters;
