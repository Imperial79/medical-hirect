import React from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import RegisterForm from "./RegisterForm";
import LoginPage from "./LoginPage";
import JobDetailPage from "./JobDetailPage";
import SearchByCompany from "./SearchByCompany";
import AboutCompany from "./AboutCompany";

function Dashboard() {
  return (
    <>
      {/* <BrowserRouter>
        <Router>
          <div className="pt-20 md:px-10 md:pb-10 text-black flex">
            <Sidebar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/job-detail" element={<JobDetailPage />} />
              <Route path="/jobs-company" element={<SearchByCompany />} />
              <Route path="/about-company" element={<AboutCompany />} />
            </Routes>
          </div>
        </Router>
      </BrowserRouter> */}
    </>
  );
}

export default Dashboard;
