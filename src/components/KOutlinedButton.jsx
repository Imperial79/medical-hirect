import React from "react";

function KOutlinedButton(props) {
  return (
    <>
      <button
        type="button"
        className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        {props.label}
      </button>
    </>
  );
}

export default KOutlinedButton;
