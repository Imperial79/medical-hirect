import React from "react";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";

function ResumesPage() {
  return (
    <>
      <div className="pt-20  text-black flex">
        <div className="">
          <Sidebar activeButton={0} />
        </div>
        <div className="">
          <BottomNavbar activeButton={0} />
        </div>

        {/* Main Content */}
        <div className="pr-[100px]">ResumesPage</div>
      </div>
    </>
  );
}

export default ResumesPage;
