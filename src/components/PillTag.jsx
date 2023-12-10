import React from "react";

function PillTag(props) {
  return (
    <>
      <div className="rounded-full bg-blue-50 px-3 py-2 text-blue-700 md:text-[15px] text-[13px] w-auto inline-flex">
        {props.label}
      </div>
    </>
  );
}

export default PillTag;
