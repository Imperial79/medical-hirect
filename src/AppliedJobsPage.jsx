import React from "react";
import Sidebar from "./components/Sidebar";
import BottomNavbar from "./components/BottomNavbar";

function AppliedJobsPage() {
  return (
    <>
      <div className="pt-20  text-black flex">
        <div className="">
          <Sidebar activeButton={1} />
        </div>
        <div className="">
          <BottomNavbar activeButton={1} />
        </div>

        {/* Main Content */}
        <div className="pr-[100px]">MyAppl</div>
      </div>
    </>
  );
}

export default AppliedJobsPage;
