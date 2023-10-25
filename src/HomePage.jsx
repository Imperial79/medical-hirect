import React from "react";
import KOutlinedButton from "./components/kOutlinedButton";
import JobCard from "./components/JobCard";
import Hero from "./components/Hero";
import trendingSearches from "./assets/trending-searches.svg";

function HomePage() {
  return (
    <>
      <div>
        <Hero
          title="Healthcare jobs & opportunities"
          subtitle="curated job openings for Physicians, Nurses, Doctors ..."
          buttonLabel="Search company"
        />

        <div className="px-2">
          <h1 className="font-semibold text-gray-700 text-center mt-10 text-2xl">
            Trending Job searches
          </h1>
          <p className="font-medium text-gray-400 text-center mt-2 text-sm">
            Most frequent searches by healthcare job seekers like you
          </p>
        </div>

        <div className="mt-20 flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 p-4">
            <img className=" h-[300px]" src={trendingSearches} alt="" />
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="flex flex-wrap">
              <KOutlinedButton label="Covid-19" />
              <KOutlinedButton label="Physycist" />
              <KOutlinedButton label="Doctors" />
              <KOutlinedButton label="Physiotherapy" />
              <KOutlinedButton label="Bangalore, Karnataka" />
              <KOutlinedButton label="Abroad" />
            </div>
          </div>
        </div>

        <h2 className="my-10 font-medium text-gray-700 text-center text-xl">
          Recent Openings
        </h2>

        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </>
  );
}

export default HomePage;
