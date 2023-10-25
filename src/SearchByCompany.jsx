import React from "react";
import Hero from "./components/Hero";
import HospitalCard from "./components/HospitalCard";

function SearchByCompany() {
  return (
    <div>
      <Hero
        title="Search Hospitals"
        subtitle="Search by thousands of reputed hospitals"
        buttonLabel="Search company"
      />
      <div className="pb-10 md:px-20 px-5 text-black">
        <div className="my-5 md:w-[80%] mx-auto">
          <h1>Search results for "UCLA Health"</h1>
        </div>
        <HospitalCard />
        <HospitalCard />
        <HospitalCard />
        <HospitalCard />
      </div>
    </div>
  );
}

export default SearchByCompany;
