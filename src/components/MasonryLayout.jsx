import React from "react";
import Masonry from "react-masonry-css";

const MasonryLayout = ({ children }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex md:ml-[-20px] ml-0 w-auto"
      columnClassName="md:pl-[20px] pl-0 bg-clip-padding"
    >
      {children}
    </Masonry>
  );
};

export default MasonryLayout;
