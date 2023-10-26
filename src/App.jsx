import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JobDetailPage from "./JobDetailPage";
import Footer from "./components/Footer";
import SearchByCompany from "./SearchByCompany";
import AboutCompany from "./AboutCompany";
import LoginPage from "./LoginPage";
import RegisterForm from "./RegisterForm";
import ProfilePage from "./ProfilePage";
import ResumesPage from "./ResumesPage";
import AppliedJobsPage from "./AppliedJobsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/job-detail" element={<JobDetailPage />} />
              <Route path="/jobs-company" element={<SearchByCompany />} />
              <Route path="/about-company" element={<AboutCompany />} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              <Route
                path="/dashboard/applied-jobs"
                element={<AppliedJobsPage />}
              />
              <Route path="/dashboard/resumes" element={<ResumesPage />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
