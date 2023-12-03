import React from "react";
import CircularProgressIndicator from "./CircularProgressIndicator";

function FullScreenLoading({ isLoading }) {
  return (
    <div
      className={`bg-white/80 z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="h-screen flex items-center justify-center">
        <CircularProgressIndicator />
      </div>
    </div>
  );
}

export default FullScreenLoading;
