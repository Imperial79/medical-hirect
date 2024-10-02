import React from "react";

function KOutlinedButton({ label, onClick, isActive }) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`py-2 px-4 text-[12px] rounded-full mr-2 mb-2 ${
          isActive
            ? "bg-blue-500 text-white border border-blue-500 hover:bg-blue-900 font-medium"
            : "text-blue-500 border border-blue-200 hover:bg-blue-100 hover:text-blue-500"
        }`}
      >
        {label}
      </button>
    </>
  );
}

export default KOutlinedButton;
