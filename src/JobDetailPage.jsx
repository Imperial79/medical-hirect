import React from "react";

function JobDetailPage() {
  return (
    <>
      <div className="pt-20 md:px-40 px-5 justify-start">
        <div className="flex mt-[20px] items-center justify-between">
          <img
            src="https://hospitalcareers.com/files/pictures/emp_logo_2858.jpg"
            alt=""
            className="md:w-80 w-[50%]"
          />

          <a href="" className="md:hidden block">
            <img src="src/assets/save.svg" alt="" className="ml-10 h-5" />
          </a>
        </div>

        <div className="flex mt-10 items-center">
          <h1 className="md:w-[60%] text-blue-900 font-medium md:text-[25px] text-[17px]">
            Front Office Admin Support - On cology, Bangalore, India
          </h1>
          <a href="" className="hidden md:block">
            <img src="src/assets/save.svg" alt="" className="ml-10 h-5" />
          </a>
        </div>

        <div className="mt-2 items-center text-gray-700 text-[16px] md:text-[20px]">
          <div className="flex items-center">
            <img src="src/assets/job.svg" alt="Company Logo" className="h-6" />
            <p className="ml-2 font-normal">UCLA Health</p>
          </div>

          <div className="mt-2 flex items-center text-[16px] md:text-[20px]">
            <img
              src="src/assets/location.svg"
              alt="Company Logo"
              className="h-6"
            />
            <p className="ml-2 font-normal ">Bangalore, Karnataka, India</p>
          </div>

          <h1 className="mt-5 font-semibold"> Job Description</h1>
          <h2 className="mt-3 md:text-[15px] text-sm">
            Description Join our research team as a Student research aAssistant.
            In this role, you'll review medical charts, extract data, validate
            records, and assist in image analysis. You'll also support
            administrative tasks, produce reports, and contribute to department
            surveys. Collaboration and adaptability are key in this dynamic
            role. The ideal candidate would be a UCLA undergraduate student.
            Salary: $17.05 - $28.00/hour Qualifications Required: * Able to work
            independently and pay attention to detail. * Ability to write
            clearly, concisely, and grammatically correct notes and memos. *
            Skill in using personal computers; working knowledge of word
            processing. * Basic knowledge of anatomy / biological science.
          </h2>

          <h1 className="mt-5 font-semibold">Emploment Type</h1>
          <h2 className="mt-3 md:text-[15px] text-sm">Full-Time</h2>

          <button
            to="/"
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
          >
            Apply Now
          </button>
        </div>
      </div>
    </>
  );
}

export default JobDetailPage;
