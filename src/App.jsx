import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JobDetailPage from "./JobDetailPage";
import Footer from "./components/Footer";
import SearchByCompany from "./SearchByCompany";
import AboutCompany from "./AboutCompany";
import LoginPage from "./LoginPage";
import RegisterForm from "./RegisterForm";
import Dashboard from "./Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="flex">
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
        <Dashboard />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
