import React, { useState } from "react";
import Scaffold from "../components/Scaffold";
import profileIcon from "../assets/profile.svg";

function ResumeBuilder() {
  const [workExperienceList, setworkExperienceList] = useState([
    {
      companyName: "",
      designation: "",
      workingSince: "",
      workingTill: "",
      jobDescription: "",
    },
  ]);

  function handleInputChange(index, e) {
    const { name, value } = e.target;
    const newFormData = [...workExperienceList];
    newFormData[index][name] = value;
    setworkExperienceList(newFormData);
  }

  const addWorkExperience = () => {
    setworkExperienceList([
      ...workExperienceList,
      {
        companyName: "",
        designation: "",
        workingSince: "",
        workingTill: "",
        jobDescription: "",
      },
    ]);
  };

  const removeForm = (index) => {
    // const newFormData = [...workExperienceList];
    // newFormData.splice(index, 1);
    // setworkExperienceList(newFormData);
    console.log(workExperienceList);
  };

  return (
    <Scaffold>
      <div className="my-20">
        <FormCard
          heading="Resume Builder"
          subHeading="This will help the recruiters to quickly analyze your qualifications"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="text-[25px] font-semibold mb-5">Create your resume</h1>
          <h2 className="text-[20px] font-medium mb-6">Personal Details</h2>
          <Grid crossAxisCount={2} gap={5}>
            <KTextField
              label="Full Name"
              type="text"
              id="fullname"
              placeholder="Eg. John Doe"
              required={true}
            />

            <ImagePicker />
          </Grid>

          <Grid crossAxisCount={2} gap={5}>
            <KTextField
              label="E-mail Address"
              type="text"
              id="email"
              placeholder="Eg. example@mail.com"
              required={true}
            />
            <KTextField
              label="Mobile Number"
              type="text"
              maxLength={10}
              id="phone"
              placeholder="Eg. 909XXXXX67"
              required={true}
            />
          </Grid>

          <Grid crossAxisCount={2} gap={5}>
            <KTextArea
              label="Address"
              type="text"
              rows={4}
              id="address"
              placeholder="Enter your address"
              required={true}
            />
            <KTextField
              label="Profile Link"
              type="text"
              maxLength={10}
              id="phone"
              placeholder="Eg. linkedin profile link"
              required={true}
            />
          </Grid>

          <SubHeading
            title="Profile Snapshot"
            subTitle="Include 2-3 clear sentences about your overall experience"
          />
          <KTextField
            id="headline"
            label="Headline"
            type="text"
            required={true}
            placeholder="Your speciality"
          />
          <KTextArea
            label="Objective"
            type="text"
            rows={3}
            id="objective"
            placeholder="What is your objective"
            required={true}
          />
          <SubHeading
            title="Work Experience"
            subTitle="Add all your employer you have worked with, List your most recent
            position first"
          />
          {workExperienceList.map((form, index) => (
            <div key={index}>
              <WorkProfileForm
                index={index}
                formId={`workProfileForm${index}`}
                removeForm={() => {
                  removeForm(index);
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                setworkExperienceList={setworkExperienceList}
                workExperienceList={workExperienceList}
              />
            </div>
          ))}

          <div
            onClick={() => {
              addWorkExperience();
            }}
            className="inline-flex items-center gap-2 font-medium text-blue-500 mt-4 hover:underline cursor-pointer"
          >
            Add a work experience
          </div>

          <SubHeading
            title="Education"
            subTitle="Adding your education will help recruiters know your value as a potential candidate"
          />

          <EducationForm
            onSubmit={(e) => {
              e.preventDefault();
            }}
          />
        </FormCard>
      </div>
    </Scaffold>
  );
}

export default ResumeBuilder;

function SubHeading({ title, subTitle }) {
  return (
    <div className="my-6">
      <h2 className="text-[20px] font-medium mb-2">{title}</h2>
      <p className="text-sm text-gray-500">{subTitle}</p>
    </div>
  );
}

function Grid({ crossAxisCount, gap, children }) {
  return (
    <div
      className={`md:grid md:grid-cols-${crossAxisCount} gap-${gap} mb-5 items-center`}
    >
      {children}
    </div>
  );
}

function FormCard({ heading, subHeading, onSubmit, children }) {
  return (
    <>
      <div className="mx-5 text-black md:max-w-[900px] lg:mx-auto content-center">
        <h1 className="mt-5 md:text-[25px] text-[20px] text-start font-medium text-black">
          {heading}
        </h1>
        <p className="text-sm text-start font-normal text-gray-500 mb-5">
          {subHeading}
        </p>
        <form
          method="POST"
          onSubmit={onSubmit}
          className="border border-gray-200 md:p-7 p-5 rounded-xl bg-white"
        >
          {children}
        </form>
      </div>
    </>
  );
}

function KTextField({
  label,
  maxLength,
  type,
  id,
  name,
  placeholder,
  required,
  onChange,
}) {
  return (
    <div>
      <label for={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        maxLength={maxLength}
        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5"
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}

function KTextArea({
  label,
  maxLength,
  rows,
  type,
  id,
  name,
  placeholder,
  required,
  onChange,
}) {
  return (
    <div>
      <label for={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <textarea
        type={type}
        id={id}
        name={name}
        rows={rows}
        maxLength={maxLength}
        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5"
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}

function ImagePicker() {
  return (
    <div className="inline-flex items-center gap-2">
      <input
        type="file"
        name="image-picker"
        id="image-picker"
        className="hidden"
      />

      <div
        onClick={() => {
          document.getElementById("image-picker").click();
        }}
        className="p-2 h-14 w-1h-14 bg-white inline-flex rounded-full border cursor-pointer"
      >
        <img src={profileIcon} alt="profile" className="object-contain" />
      </div>

      <div>
        <h2 className="text-blue-600 font-medium">Upload photo</h2>
        <h2 className="text-gray-500 font-normal text-sm">
          Allowed file formats: jpg, jpeg, png
        </h2>
      </div>
    </div>
  );
}

function WorkProfileForm({
  index,
  formId,
  onSubmit,
  removeForm,
  workExperienceList,
  setworkExperienceList,
}) {
  function handleInputChange(index, e) {
    const { id, value } = e.target;
    const newFormData = [...workExperienceList];
    newFormData[index][id] = value;
    setworkExperienceList(newFormData);
  }
  return (
    <form
      id={formId}
      method="POST"
      onSubmit={onSubmit}
      className="p-5 bg-gray-50 rounded-xl border border-gray-200 mb-5"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold mb-2"># {index + 1}</h1>
        <button
          type="button"
          onClick={removeForm}
          className={`${index == 0 ? "hidden" : ""} font-medium text-red-500`}
        >
          Remove
        </button>
      </div>
      <Grid crossAxisCount={2} gap={5}>
        <KTextField
          label="Company Name"
          type="text"
          id={`companyName`}
          name="companyName"
          placeholder="Enter name of the company"
          required={true}
          onChange={(e) => {
            handleInputChange(index, e);
          }}
        />
        <KTextField
          label="Designation"
          type="text"
          maxLength={10}
          id={`designation`}
          name="designation"
          placeholder="Enter your designation"
          required={true}
          onChange={(e) => {
            handleInputChange(index, e);
          }}
        />
      </Grid>
      <Grid crossAxisCount={2} gap={5}>
        <div>
          <KTextField
            type="date"
            label="Working Since"
            id={`workingSince`}
            name="workingSince"
            onChange={(e) => {
              handleInputChange(index, e);
            }}
          />
        </div>
        <div>
          <KTextField
            type="date"
            label="Working Till"
            id={`workingTill`}
            name="workingTill"
            onChange={(e) => {
              handleInputChange(index, e);
            }}
          />
        </div>
      </Grid>

      <KTextArea
        id={`jobDescription`}
        name="jobDescription"
        label="Describe your job"
        rows={3}
        placeholder="Something about your job"
        type="text"
        onChange={(e) => {
          handleInputChange(index, e);
        }}
      />
    </form>
  );
}

function EducationForm({ onSubmit, children }) {
  return (
    <form
      method="POST"
      onSubmit={onSubmit}
      className="p-5 bg-gray-50 rounded-xl border border-gray-200"
    >
      <Grid crossAxisCount={2} gap={5}>
        <KTextField
          label="Course Name"
          type="text"
          id="courseName"
          placeholder="Eg. 10, 12, M.B.B.S. etc"
          required={true}
        />
        <KTextField
          label="Year"
          type="text"
          id="educationYear"
          placeholder="2010-2013"
          required={true}
        />
      </Grid>

      <KTextArea
        id="educationDescription"
        label="Describe your education"
        rows={3}
        placeholder="Something about your education"
        type="text"
      />
    </form>
  );
}

// function KDropDown({ buttonId, dropdownId, label, currentValue }) {
//   const [isDropOpen, setisDropOpen] = useState(false);
//   return (
//     <div>
//       <label
//         for={buttonId}
//         className="block mb-2 text-sm font-medium text-gray-900"
//       >
//         {label}
//       </label>
//       <button
//         onClick={() => {
//           setisDropOpen(!isDropOpen);
//         }}
//         id={buttonId}
//         className={`shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-5 inline-flex items-center justify-between`}
//         type="button"
//       >
//         {currentValue}
//         <svg
//           className="w-2.5 h-2.5 ms-3"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 10 6"
//         >
//           <path
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             d="m1 1 4 4 4-4"
//           />
//         </svg>
//       </button>

//       <div
//         id={dropdownId}
//         className={`${
//           isDropOpen ? "hidden" : "absolute"
//         } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
//       >
//         <ul className="py-2 text-sm text-gray-700">
//           <li>
//             <button className="block px-4 py-2 hover:bg-gray-100 w-full text-start">
//               Dashboard
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
