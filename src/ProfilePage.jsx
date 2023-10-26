import React from "react";
import Sidebar from "./components/Sidebar";
import BottomNavbar from "./components/BottomNavbar";

function ProfilePage() {
  return (
    <>
      <div className="pt-20  text-black flex">
        <div className="">
          <Sidebar activeButton={2} />
        </div>
        <div className="">
          <BottomNavbar activeButton={2} />
        </div>

        {/* Main Content */}
        <div className="pr-[100px]">My Profile</div>
      </div>
    </>
  );
}

export default ProfilePage;
