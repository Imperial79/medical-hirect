import React, { useContext, useEffect, useState } from "react";
import Scaffold from "../components/Scaffold";
import profileIcon from "../assets/profile.svg";
import {
  KButton,
  KGrid,
  KTextArea,
  KTextField,
} from "../components/components";
import { Context } from "../Helper/ContextProvider";
import { dbObject } from "../Helper/Constants";
import { useNavigate } from "react-router-dom";

function ResumeBuilder() {
  const { user, setAlert } = useContext(Context);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [textfield, settextfield] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profileLink: "",
    subRole: "",
    objective: "",
  });

  useEffect(() => {
    if (user !== null) {
      settextfield({
        ...textfield,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
        objective: user.bio ?? "",
        subRole: user.subRole ?? "",
      });
      setexpertiseList(
        JSON.parse(
          user?.expertiseDescription === "" ? "[]" : user?.expertiseDescription
        )
      );
      seteducationDataList(
        JSON.parse(
          user?.educationDescription === ""
            ? JSON.stringify([
                {
                  courseName: "",
                  year: "",
                  courseDescription: "",
                },
              ])
            : user?.educationDescription
        )
      );
      setworkDataList(
        JSON.parse(
          user?.workDescription === ""
            ? JSON.stringify([
                {
                  companyName: "",
                  designation: "",
                  year: "",
                  workDescription: "",
                },
              ])
            : user?.workDescription
        )
      );
    }
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
      // {
      //   expertise: "",
      // },
      "",
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
  };

  const removeWorkForm = (index) => {
    const tempFormdata = [...workDataList];
    tempFormdata.splice(index, 1);
    setworkDataList(tempFormdata);
  };

  async function createResume() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("firstName", textfield.firstName);
      formData.append("lastName", textfield.lastName);
      formData.append("profileLink", textfield.profileLink);
      formData.append("subRole", textfield.subRole);
      formData.append("bio", textfield.objective);
      formData.append("expertiseDescription", JSON.stringify(expertiseList));
      formData.append(
        "educationDescription",
        JSON.stringify(educationDataList)
      );
      formData.append("workDescription", JSON.stringify(workDataList));

      const response = await dbObject.post(
        "/resume/build-resume.php",
        formData
      );
      if (!response.data.error) {
        navigate("/dashboard/resume", { replace: true });
      }
      setAlert({
        content: response.data.message,
        isDanger: response.data.error,
      });
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  return (
    <Scaffold isLoading={loading}>
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
          <ImagePicker userImage={user?.image} setloading={setloading} />
          <KGrid crossAxisCount={2} gap={5} margin="my-6">
            <KTextField
              label="Firstname"
              id="firstName"
              placeholder="Eg. John"
              required={true}
              value={textfield?.firstName}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <KTextField
              label="Lastname"
              id="lastName"
              placeholder="Eg. Doe"
              required={true}
              value={textfield?.lastName}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </KGrid>

          <KGrid crossAxisCount={2} gap={5}>
            <KTextField
              label="E-mail Address"
              type="text"
              id="email"
              placeholder="Eg. example@mail.com"
              readOnly
              value={textfield.email}
            />
            <KTextField
              label="Mobile Number"
              type="text"
              maxLength={10}
              id="phone"
              readOnly
              placeholder="Eg. 909XXXXX67"
              value={textfield.phone}
            />
          </KGrid>

          <KGrid crossAxisCount={2} gap={5} alignment="start" margin="mb-0">
            <KTextArea
              label="Address"
              type="text"
              rows={4}
              id="address"
              placeholder="Enter your address"
              readOnly
              value={textfield.address}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <KTextField
              label="Profile Link"
              type="text"
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
            id="subRole"
            label="Sub-Role"
            type="text"
            required={true}
            placeholder="Your speciality"
            value={textfield.subRole}
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
            {expertiseList.map((value, index) => (
              <div key={index} className="list-none">
                <ExpertiseForm
                  index={index}
                  value={value}
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
          {educationDataList.map((data, index) => (
            <div key={index}>
              <EducationForm
                index={index}
                formId={`educationForm${index}`}
                removeEducationForm={() => {
                  removeEducationForm(index);
                }}
                data={data}
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
          {workDataList.map((data, index) => (
            <div key={index}>
              <WorkForm
                index={index}
                formId={`workForm${index}`}
                removeWorkForm={() => {
                  removeWorkForm(index);
                }}
                data={data}
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
              createResume();
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

function ImagePicker({ userImage, setloading }) {
  const [imagePreview, setimagePreview] = useState(null);
  const [fileName, setfileName] = useState(null);

  async function uploadImage(imageFile) {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("mediaFile", imageFile);
      const response = await dbObject.post("/users/update-dp.php", formData);
      setloading(false);
      setAlert({
        content: response.data.message,
        isDanger: response.data.error,
      });
    } catch (error) {
      setloading(false);
      setAlert({
        content: "Sorry for inconvenience! Please try again.",
        isDanger: true,
      });
    }
  }

  useEffect(() => {
    setimagePreview(userImage);
  }, [userImage]);

  return (
    <div className="inline-flex items-center gap-2">
      <input
        type="file"
        name="image-picker"
        id="image-picker"
        className="hidden"
        onChange={(e) => {
          setimagePreview(URL.createObjectURL(e.target.files[0]));
          setfileName(e.target.files[0].name);
          uploadImage(e.target.files[0]);
        }}
      />

      <div
        onClick={() => {
          document.getElementById("image-picker").click();
        }}
        className="h-12 w-12 bg-white inline-flex rounded-full border border-gray-400 cursor-pointer"
      >
        <img
          src={imagePreview ?? profileIcon}
          alt="profile"
          className="h-full w-full object-cover rounded-full"
        />
      </div>

      <div>
        <h2 className="text-blue-600 font-medium">
          {fileName ?? "Upload photo"}
        </h2>
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
  value,
}) {
  function handleInputChange(index, e) {
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
        value={value}
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
  removeEducationForm,
  educationDataList = [],
  seteducationDataList,
  data,
}) {
  function handleInputChange(index, e) {
    const { id, value } = e.target;
    const newFormData = [...educationDataList];
    newFormData[index][id] = value;
    seteducationDataList(newFormData);
  }
  return (
    <div
      id={formId + index}
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
          placeholder="Enter name of the course"
          required={true}
          onChange={(e) => {
            handleInputChange(index, e);
          }}
          value={data.courseName}
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
          value={data.year}
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
        value={data.courseDescription}
      />
    </div>
  );
}

function WorkForm({
  index,
  formId,
  removeWorkForm,
  workDataList = [],
  setworkDataList,
  data = {},
}) {
  function handleInputChange(index, e) {
    const { id, value } = e.target;
    const newFormData = [...workDataList];
    newFormData[index][id] = value;
    setworkDataList(newFormData);
  }
  return (
    <div
      id={formId + index}
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
          value={data.companyName}
        />
        <KTextField
          label="Designation"
          type="text"
          id="designation"
          placeholder="Position you were/are working on"
          onChange={(e) => {
            handleInputChange(index, e);
          }}
          value={data.designation}
        />
        <KTextField
          label="Year"
          type="text"
          id="year"
          placeholder="Work duration (Eg. 2012-2015)"
          onChange={(e) => {
            handleInputChange(index, e);
          }}
          value={data.year}
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
    </div>
  );
}
