import React from "react";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";
import JobCard from "../components/JobCard";

function AppliedJobsPage() {
  return (
    <>
      <div className="pt-20 text-black md:flex">
        <Sidebar activeButton={1} />
        <BottomNavbar activeButton={1} />

        {/* Main Content */}
        <div className="p-[20px]">
          <h1 className="md:text-[40px] text-[20px] font-semibold mb-5">
            Applied Jobs
          </h1>

          <JobCard />
        </div>
      </div>
    </>
  );
}

export default AppliedJobsPage;
