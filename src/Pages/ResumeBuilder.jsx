import React, { useContext, useEffect, useState } from "react";
import Scaffold from "../components/Scaffold";
import profileIcon from "../assets/profile.svg";
import { useNavigate } from "react-router-dom";
import {
  KButton,
  KGrid,
  KTextArea,
  KTextField,
} from "../components/components";
import { Context } from "../Helper/ContextProvider";

function ResumeBuilder() {
  const { user } = useContext(Context);

  const [textfield, settextfield] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    profileLink: "",
    headline: "",
    objective: "",
  });

  useEffect(() => {
    settextfield({
      ...textfield,
      fullname: user === null ? "" : user?.firstName + " " + user?.lastName,
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    });
  }, [user]);

  function handleInputChange(e) {
    settextfield({
      ...textfield,
      [e.target.id]: e.target.value,
    });
  }

  const [educationDataList, seteducationDataList] = useState([
    {
      courseName: "",
      year: "",
      courseDescription: "",
    },
  ]);

  // const [expertiseList, setexpertiseList] = useState([
  //   {
  //     expertise: "",
  //   },
  // ]);

  const [expertiseList, setexpertiseList] = useState([]);

  const [workDataList, setworkDataList] = useState([
    {
      companyName: "",
      designation: "",
      year: "",
      workDescription: "",
    },
  ]);

  const addEducationForm = () => {
    seteducationDataList([
      ...educationDataList,
      {
        courseName: "",
        year: "",
        courseDescription: "",
      },
    ]);
  };
  const addExpertiseForm = () => {
    setexpertiseList([
      ...expertiseList,
      {
        expertise: "",
      },
    ]);
  };
  const addWorkForm = () => {
    setworkDataList([
      ...workDataList,
      {
        companyName: "",
        designation: "",
        year: "",
        workDescription: "",
      },
    ]);
  };

  const removeExpertiseForm = (index) => {
    const tempFormdata = [...expertiseList];
    tempFormdata.splice(index, 1);
    setexpertiseList(tempFormdata);
  };

  const removeEducationForm = (index) => {
    const tempFormdata = [...educationDataList];
    tempFormdata.splice(index, 1);
    seteducationDataList(tempFormdata);
    console.log(educationDataList);
  };

  const removeWorkForm = (index) => {
    const tempFormdata = [...workDataList];
    tempFormdata.splice(index, 1);
    setworkDataList(tempFormdata);
    console.log(workDataList);
  };

  const navigator = useNavigate();

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
          <KGrid crossAxisCount={2} gap={5}>
            <KTextField
              label="Full Name"
              type="text"
              id="fullname"
              placeholder="Eg. John Doe"
              required={true}
              value={textfield?.fullname}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />

            <ImagePicker />
          </KGrid>

          <KGrid crossAxisCount={2} gap={5}>
            <KTextField
              label="E-mail Address"
              type="text"
              id="email"
              placeholder="Eg. example@mail.com"
              required={true}
              value={textfield.email}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <KTextField
              label="Mobile Number"
              type="text"
              maxLength={10}
              id="phone"
              placeholder="Eg. 909XXXXX67"
              required={true}
              value={textfield.phone}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </KGrid>

          <KGrid crossAxisCount={2} gap={5} alignment="start" margin="mb-0">
            <KTextArea
              label="Address"
              type="text"
              rows={4}
              id="address"
              placeholder="Enter your address"
              required={true}
              value={textfield.address}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <KTextField
              label="Profile Link"
              type="text"
              maxLength={10}
              id="profileLink"
              placeholder="Eg. linkedin profile link"
              required={true}
              value={textfield.profileLink}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </KGrid>

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
            value={textfield.headline}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <KTextArea
            label="Objective"
            type="text"
            rows={3}
            id="objective"
            placeholder="What is your objective"
            value={textfield.objective}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />

          <SubHeading
            title="Expertise"
            subTitle="Adding your expertise will help recruiters know your value as a potential candidate"
          />
          <div>
            {expertiseList.map((form, index) => (
              <div key={index} className="list-none">
                <ExpertiseForm
                  index={index}
                  removeExpertise={removeExpertiseForm}
                  setexpertiseList={setexpertiseList}
                  expertiseList={expertiseList}
                />
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              addExpertiseForm();
            }}
            className="inline-flex items-center gap-2 font-medium text-blue-500 mt-4 hover:underline cursor-pointer"
          >
            Add expertise
          </div>

          <SubHeading
            title="Education"
            subTitle="Adding your education will help recruiters know your value as a potential candidate"
          />
          {educationDataList.map((form, index) => (
            <div key={index}>
              <EducationForm
                index={index}
                formId={`educationForm${index}`}
                removeEducationForm={() => {
                  removeEducationForm(index);
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                seteducationDataList={seteducationDataList}
                educationDataList={educationDataList}
              />
            </div>
          ))}

          <div
            onClick={() => {
              addEducationForm();
            }}
            className="inline-flex items-center gap-2 font-medium text-blue-500 mt-4 hover:underline cursor-pointer"
          >
            Add Education
          </div>

          <SubHeading
            title="Work Experience"
            subTitle="Add all your employer you have worked with, List your most recent position first"
          />
          {workDataList.map((form, index) => (
            <div key={index}>
              <WorkForm
                index={index}
                formId={`workForm${index}`}
                removeWorkForm={() => {
                  removeWorkForm(index);
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                setworkDataList={setworkDataList}
                workDataList={workDataList}
              />
            </div>
          ))}

          <div
            onClick={() => {
              addWorkForm();
            }}
            className="inline-flex items-center gap-2 font-medium text-blue-500 mt-4 hover:underline cursor-pointer"
          >
            Add Work
          </div>

          <KButton
            id="createResume"
            onClick={() => {
              navigator("/dashboard/resume");
            }}
            margin="mt-5"
            label="Create Resume"
          />
        </FormCard>
      </div>
    </Scaffold>
  );
}

export default ResumeBuilder;

function SubHeading({ title, subTitle }) {
  return (
    <div className="mt-10 mb-6">
      <h2 className="text-[20px] font-medium mb-2">{title}</h2>
      <p className="text-sm text-gray-500">{subTitle}</p>
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

function ExpertiseForm({
  index,
  removeExpertise,
  expertiseList = [],
  setexpertiseList,
}) {
  function handleInputChange(index, e) {
    // const { id, value } = e.target;
    // const newFormData = [...expertiseList];
    // newFormData[index][id] = value;
    // setexpertiseList(newFormData);

    const value = e.target.value;
    const tempForm = [...expertiseList];
    tempForm[index] = value;
    setexpertiseList(tempForm);
  }
  return (
    <div className="items-center gap-2">
      <KTextField
        id={`expertise${index}`}
        label={`Skill ${index + 1}`}
        placeholder="Enter a skill"
        onChange={(e) => {
          handleInputChange(index, e);
        }}
        actionElement={
          <svg
            onClick={removeExpertise}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 text-red-500 ${index === 0 ? "hidden" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        }
      />
    </div>
  );
}

function EducationForm({
  index,
  formId,
  onSubmit,
  removeEducationForm,
  educationDataList = [],
  seteducationDataList,
}) {
  function handleInputChange(index, e) {
    const { id, value } = e.target;
    const newFormData = [...educationDataList];
    newFormData[index][id] = value;
    seteducationDataList(newFormData);
  }
  return (
    <form
      id={formId + index}
      method="POST"
      onSubmit={onSubmit}
      className={`p-5 bg-gray-50 rounded-xl border border-gray-200 ${
        educationDataList.length - 1 === index ? "mb-0" : "mb-5"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold mb-2"># {index + 1}</h1>
        <button
          type="button"
          onClick={removeEducationForm}
          className={`${index == 0 ? "hidden" : ""} font-medium text-red-500`}
        >
          Remove
        </button>
      </div>
      <KGrid crossAxisCount={2} gap={5}>
        <KTextField
          label="Course Name"
          type="text"
          id="courseName"
          name="companyName"
          placeholder="Enter name of the company"
          required={true}
          onChange={(e) => {
            handleInputChange(index, e);
          }}
        />
        <KTextField
          label="Year"
          type="text"
          id="year"
          name="year"
          placeholder="Course duration (Eg. 2012-2015)"
          required={true}
          onChange={(e) => {
            handleInputChange(index, e);
          }}
        />
      </KGrid>

      <KTextArea
        id="courseDescription"
        name="courseDescription"
        label="Describe your course"
        rows={3}
        placeholder="Something about your course"
        type="text"
        onChange={(e) => {
          handleInputChange(index, e);
        }}
      />
    </form>
  );
}

function WorkForm({
  index,
  formId,
  onSubmit,
  removeWorkForm,
  workDataList = [],
  setworkDataList,
}) {
  function handleInputChange(index, e) {
    const { id, value } = e.target;
    const newFormData = [...workDataList];
    newFormData[index][id] = value;
    setworkDataList(newFormData);
  }
  return (
    <form
      id={formId}
      method="POST"
      onSubmit={onSubmit}
      className={`p-5 bg-gray-50 rounded-xl border border-gray-200 ${
        workDataList.length - 1 === index ? "mb-0" : "mb-5"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold mb-2"># {index + 1}</h1>
        <button
          type="button"
          onClick={removeWorkForm}
          className={`${index == 0 ? "hidden" : ""} font-medium text-red-500`}
        >
          Remove
        </button>
      </div>
      <KGrid crossAxisCount={2} gap={5}>
        <KTextField
          label="Company Name"
          type="text"
          id="companyName"
          placeholder="Enter name of the company"
          onChange={(e) => {
            handleInputChange(index, e);
          }}
        />
        <KTextField
          label="Designation"
          type="text"
          id="designation"
          placeholder="Position you were/are working on"
          onChange={(e) => {
            handleInputChange(index, e);
          }}
        />
        <KTextField
          label="Year"
          type="text"
          id="year"
          placeholder="Work duration (Eg. 2012-2015)"
          onChange={(e) => {
            handleInputChange(index, e);
          }}
        />
      </KGrid>

      <KTextArea
        label="Describe your work"
        id="workDescription"
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
