import React, { useEffect, useState } from "react";
import resumeIcon from "../assets/resume.svg";
import Scaffold from "../components/Scaffold";
import logoSmall from "../assets/logo-transparent.png";

function AboutContactPage() {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ------------------->

  return (
    <Scaffold isLoading={loading}>
      <div className="pt-20 pb-10 lg:px-20 md:px-5 px-5 text-black">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-xl drop-shadow-2xl z-20">
          <div className="flex mt-[17px] items-center justify-between">
            <div className="w-full rounded-t-xl overflow-hidden">
              <img
                src="https://hirehelix.in/logo-180x180.png"
                alt="recruiter-image"
                className=" object-cover mx-auto"
              />
            </div>
          </div>
          <div className="p-5">
            <h1 className="text-black font-medium text-lg mt-5 text-center">
              <span className="text-blue-700 font-semibold">Hirehelix</span> |{" "}
              MAARS STAFFING AND SECURITY SERVICES (OPC) PRIVATE LIMITED
            </h1>

            <div className="mt-2 items-center text-gray-700 text-[15px] md:text-[17px]">
              <h1 className="mt-5 font-medium text-[17px]">About Us</h1>
              <h2 className="mt-3 md:text-[15px] text-sm bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl">
                Welcome to Hirehelix, your dedicated platform for navigating the
                medical job market and advancing your career in the healthcare
                industry.
                <br />
                <br />
                <b>Our Story</b>
                <br />
                Hirehelix was founded with a vision to revolutionize the way
                medical professionals find job opportunities. We understand the
                challenges and complexities of the medical job market and are
                committed to simplifying the process for both employers and job
                seekers alike.
                <br />
                <br />
                <b>Our Mission</b>
                <br />
                At Hirehelix, our mission is to empower medical professionals to
                find their dream jobs with ease and efficiency. We are dedicated
                to providing a user-friendly platform that connects talented
                individuals with rewarding career opportunities in the
                healthcare sector.
                <br />
                <br />
                <b>What We Offer</b>
                <br />
                We specialize in providing comprehensive job search and
                application solutions tailored specifically for the medical
                field. With Hirehelix, you can:
                <br />
                <br />
                <ul>
                  <li className="ml-5">
                    1. Search and browse a wide range of medical job
                    opportunities, from nursing to specialized healthcare roles.
                  </li>
                  <li className="ml-5">
                    2. Apply for positions seamlessly with our intuitive
                    application process.
                  </li>
                  <li className="ml-5">
                    3. Create customized resumes that highlight your skills,
                    qualifications, and experience.
                  </li>
                  <li className="ml-5">
                    4. Track the status of your job applications and stay
                    informed throughout the hiring process.
                  </li>
                  <li className="ml-5">
                    5. Bookmark favorite job listings for future reference and
                    convenience.
                  </li>
                </ul>
                <br />
                <br />
                <b>Why Choose Us?</b>
                <br />
                <ul>
                  <li className="ml-5">
                    1. Expertise: Our team understands the unique needs and
                    challenges of the medical job market, and we leverage our
                    expertise to provide tailored solutions for our users.
                  </li>
                  <li className="ml-5">
                    2. User-Friendly Interface: We prioritize usability and
                    simplicity, ensuring that our platform is easy to navigate
                    for both job seekers and employers.
                  </li>
                  <li className="ml-5">
                    3. Comprehensive Support: From resume building to
                    application tracking, we offer comprehensive support to help
                    you succeed in your job search.
                  </li>
                  <li className="ml-5">
                    4. Dedicated to Your Success: Your success is our priority.
                    We are committed to helping you find the perfect job and
                    advance your career in the medical field.
                  </li>
                </ul>
              </h2>

              <h1 className="mt-5 font-medium text-[17px]">Contact Us</h1>
              <h2 className="mt-3 md:text-[15px] text-sm bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl">
                Have questions or need assistance? We're here to help! Reach out
                to us through the following channels:
                <br />
                <br />
                <b>Email:</b> support@hirehelix.in
                <br />
                <b>Address:</b> No.15, Ari street, Vellore, Tamil Nadu, 635601
                <br />
                <br />
                Our dedicated team is available to assist you with any
                inquiries, feedback, or support requests. We strive to respond
                promptly and provide the assistance you need to succeed in your
                medical job search journey.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export default AboutContactPage;
