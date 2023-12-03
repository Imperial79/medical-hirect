import React, { useState } from "react";
import Scaffold from "../components/Scaffold";

function ApplyJobPage() {
  const [loading, setloading] = useState(false);
  return <Scaffold isLoading={loading}></Scaffold>;
}

export default ApplyJobPage;
