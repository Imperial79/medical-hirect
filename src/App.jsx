import { useState } from "react";
import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JobDetailPage from "./JobDetailPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Navbar /> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-detail" element={<JobDetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
