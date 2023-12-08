import HomePage from "./Pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JobDetailPage from "./Pages/JobDetailPage";
import Footer from "./components/Footer";
import LoginPage from "./Pages/LoginPage";
import RegisterForm from "./Pages/RegisterForm";
import ProfilePage from "./Pages/ProfilePage";
import ResumesPage from "./Pages/ResumesPage";
import AppliedJobsPage from "./Pages/AppliedJobsPage";
import ContextProvider from "./Helper/ContextProvider";
import Alert from "./components/Alert";
import SearchRecruiters from "./Pages/SearchRecruiters";
import AboutRecruiter from "./Pages/AboutRecruiter";

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Alert />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/job-detail" element={<JobDetailPage />} />
            <Route path="/jobs-recruiter" element={<SearchRecruiters />} />
            <Route path="/about-recruiter" element={<AboutRecruiter />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route
              path="/dashboard/applied-jobs"
              element={<AppliedJobsPage />}
            />
            <Route path="/dashboard/resumes" element={<ResumesPage />} />

            {/* <Route path='/recruiter' render={() => (window.location.href = 'https://recruiter.shapon.tech')} /> */}
          </Routes>
        </ContextProvider>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
