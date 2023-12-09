import React, { useState } from "react";
import Scaffold from "../components/Scaffold";

function BookmarkedApplications() {
  const [loading, setloading] = useState(false);
  return <Scaffold isLoading={loading}></Scaffold>;
}

export default BookmarkedApplications;
