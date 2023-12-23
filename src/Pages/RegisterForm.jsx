import React, { useContext, useEffect, useState } from "react";
import doctor from "../assets/doctor.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { dbObject, experienceList } from "../Helper/Constants";
import Select from "react-select";
import { Context } from "../Helper/ContextProvider";
import Scaffold from "../components/Scaffold";

function RegisterForm() {
  const { _id, setAlert, setUser } = useContext(Context);
  const location = useLocation();
  const navigator = useNavigate();

  const otp = location.state.otp;
  const phone = location.state.phone;
  const email = location.state.email;
  const guid = location.state.guid;
  const registerType = location.state.type;
  const [graduationDate, setgraduationDate] = useState("");

  const [loading, setloading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [roleList, setroleList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [subRoleList, setSubRoleList] = useState(["Choose Sub Role"]);
  // post multi
  const [postList, setpostList] = useState([]);
  const [selectedPostList, setselectedPostList] = useState([]);

  // emplo multi
  const [employmentTypeList, setemploymentTypeList] = useState([]);
  const [selectedEmploymentTypeList, setselectedEmploymentTypeList] = useState(
    []
  );
  // speci multi
  const [speciList, setspeciList] = useState([]);
  const [selectedSpeciList, setselectedSpeciList] = useState([]);

  // work multi
  const [workSettingList, setworkSettingList] = useState([]);
  const [selectedWorkSettingList, setselectedWorkSettingList] = useState([]);

  const [graduationTypeList, setgraduationTypeList] = useState([]);
  const [selectedGraduationTypeList, setselectedGraduationTypeList] = useState(
    []
  );

  const handlePostChange = (selectedOptions) => {
    setselectedPostList(selectedOptions);
  };
  const handleEmploChange = (selectedOptions) => {
    setselectedEmploymentTypeList(selectedOptions);
  };
  const handleSpeciChange = (selectedOptions) => {
    setselectedSpeciList(selectedOptions);
  };
  const handleWorkChange = (selectedOptions) => {
    setselectedWorkSettingList(selectedOptions);
  };
  const handleGraduationChange = (selectedOptions) => {
    setselectedGraduationTypeList(selectedOptions);
  };

  const [dropdownData, setDropdownData] = useState({
    gender: "Select Gender",
    role: 0,
    subRole: "Select Sub-Role",
    state: "Andhra Pradesh",
    experience: "0",
  });

  const [isDropdownOpen, setDropdownOpen] = useState({
    gender: false,
    role: false,
    subRole: false,
    state: false,
    experience: false,
  });

  // TODO:
  const handleDropdownChange = (dropdownName, value) => {
    if (dropdownName === "role") {
      setselectedPostList([]);
      setselectedEmploymentTypeList([]);
      setselectedSpeciList([]);
      setselectedGraduationTypeList([]);
    }
    setDropdownOpen((prevValues) => ({
      ...prevValues,
      [dropdownName]: value,
    }));
  };

  const handleDropdownData = (dropdownName, value) => {
    setDropdownData((prevValues) => ({
      ...prevValues,
      [dropdownName]: value,
    }));
    if (dropdownName === "role") {
      handleDropdownData("subRole", "Choose Sub Role");
      if (roleList[value].subRoles !== "NULL") {
        setSubRoleList(JSON.parse(roleList[value].subRoles));
      } else {
        setSubRoleList([]);
      }
      let temp = [];
      setselectedPostList([]);
      if (roleList[value].posts !== "NULL") {
        const parsedPosts = JSON.parse(roleList[value].posts);
        temp = parsedPosts.map((data) => ({ label: data, value: data }));
        setpostList(temp);
      } else {
        setpostList([]);
      }

      if (roleList[value].employmentType !== "NULL") {
        const parsedEmplo = JSON.parse(roleList[value].employmentType);
        temp = parsedEmplo.map((data) => ({ label: data, value: data }));
        setemploymentTypeList(temp);
      } else {
        setemploymentTypeList([]);
      }

      if (roleList[value].specialization !== "NULL") {
        const parsedSpeci = JSON.parse(roleList[value].specialization);
        temp = parsedSpeci.map((data) => ({ label: data, value: data }));
        setspeciList(temp);
      } else {
        setspeciList([]);
      }

      if (roleList[value].workSetting !== "NULL") {
        const parsedWork = JSON.parse(roleList[value].workSetting);
        temp = parsedWork.map((data) => ({ label: data, value: data }));
        setworkSettingList(temp);
      } else {
        setworkSettingList([]);
      }
      if (roleList[value].graduationType !== "NULL") {
        const parsedWork = JSON.parse(roleList[value].graduationType);
        temp = parsedWork.map((data) => ({ label: data, value: data }));
        setgraduationTypeList(temp);
      } else {
        setgraduationTypeList([]);
      }
    }
  };

  // ---------------functions----------------->

  useEffect(() => {
    fetchRole();
    fetchState();
  }, []);

  async function fetchRole() {
    const response = await dbObject.get("/role/fetch-roles.php");
    if (!response.data.error) {
      setroleList(response.data.response);
    }
  }

  async function fetchState() {
    const response = await dbObject.get("/states/fetch-states.php");
    if (!response.data.error) {
      setStateList(response.data.response);
    }
  }

  async function registerUsingPhone() {
    try {
      setloading(true);
      const formData = new FormData();
      let postList = selectedPostList.reduce(
        (acc, obj) => acc.concat(obj.value),
        []
      );

      let emploList = selectedEmploymentTypeList.reduce(
        (acc, obj) => acc.concat(obj.value),
        []
      );

      let speciList = selectedSpeciList.reduce(
        (acc, obj) => acc.concat(obj.value),
        []
      );

      let workSettingList = selectedWorkSettingList.reduce(
        (acc, obj) => acc.concat(obj.value),
        []
      );

      let gradTypeList = selectedGraduationTypeList.reduce(
        (acc, obj) => acc.concat(obj.value),
        []
      );

      formData.append("firstName", _id("firstName").value);
      formData.append("lastName", _id("lastName").value);
      formData.append("dob", _id("dob").value);
      formData.append("gender", dropdownData.gender);
      formData.append("phone", phone);
      formData.append("email", _id("email").value);
      formData.append("otp", otp);
      formData.append("experience", experienceList[dropdownData.experience]);
      formData.append("specialization", JSON.stringify(speciList));
      formData.append("address", _id("address").value);
      formData.append("city", _id("city").value);
      formData.append("state", dropdownData.state);
      formData.append("roleId", roleList[dropdownData.role]?.id);
      formData.append(
        "subRole",
        dropdownData.subRole === "Select Sub-Role" ? "" : dropdownData.subRole
      );
      formData.append("post", JSON.stringify(postList));
      formData.append("employmentType", JSON.stringify(emploList));
      formData.append("workSetting", JSON.stringify(workSettingList));
      formData.append("graduationType", JSON.stringify(gradTypeList));
      formData.append("graduationDate", graduationDate);
      formData.append("fcmToken", "");

      const response = await dbObject.post(
        "/users/register-with-phone.php",
        formData
      );

      if (!response.data.error) {
        setUser(response.data.response);
        navigator("/", { replace: true });
      } else {
        setAlert({
          content: response.data.message,
          isDanger: true,
        });
      }

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  async function registerUsingEmail() {
    try {
      setloading(true);
      const formData = new FormData();
      let postList = selectedPostList.reduce(
        (acc, obj) => acc.concat(obj.value),
        []
      );

      let emploList = selectedEmploymentTypeList.reduce(
        (acc, obj) => acc.concat(obj.value),
        []
      );
      let speciList = selectedSpeciList.reduce(
        (acc, obj) => acc.concat(obj.value),
        []
      );

      let workSettingList = selectedWorkSettingList.reduce(
        (acc, obj) => acc.concat(obj.value),
        []
      );

      let gradTypeList = selectedGraduationTypeList.reduce(
        (acc, obj) => acc.concat(obj.value),
        []
      );

      formData.append("guid", guid);
      formData.append("firstName", _id("firstName").value);
      formData.append("lastName", _id("lastName").value);
      formData.append("dob", _id("dob").value);
      formData.append("gender", dropdownData.gender);
      formData.append("phone", _id("phone").value);
      formData.append("email", email);
      formData.append("otp", otp);
      formData.append("experience", experienceList[dropdownData.experience]);
      formData.append("specialization", JSON.stringify(speciList));
      formData.append("address", _id("address").value);
      formData.append("city", _id("city").value);
      formData.append("state", dropdownData.state);
      formData.append("roleId", roleList[dropdownData.role]?.id);
      formData.append(
        "subRole",
        dropdownData.subRole === "Select Sub-Role" ? "" : dropdownData.subRole
      );
      formData.append("post", JSON.stringify(postList));
      formData.append("employmentType", JSON.stringify(emploList));
      formData.append("workSetting", JSON.stringify(workSettingList));
      formData.append("graduationType", JSON.stringify(gradTypeList));
      formData.append("graduationDate", graduationDate);
      formData.append("fcmToken", "");

      const response = await dbObject.post(
        "/users/register-with-google.php",
        formData
      );

      if (!response.data.error) {
        setUser(response.data.response);
        navigator("/", { replace: true });
      } else {
        setAlert({
          content: response.data.message,
          isDanger: true,
        });
      }

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  return (
    <Scaffold isLoading={loading}>
      <div className="pt-20 md:pb-10 text-black">
        <div className="items-start bg-[#f8f8f8] p-2 rounded-[20px] lg:w-[80%] md:w-[99%] md:mx-auto m-5 md:flex">
          <img
            src={doctor}
            alt=""
            className="lg:w-[30%] md:w-[30%] my-20 mx-20 hidden md:block"
          />
          <div className="bg-white rounded-[20px] py-10 px-10 items-center justify-center md:w-full">
            <h1 className="text-[20px] mb-4">Register as a job finder</h1>

            <form
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                if (registerType === "Phone") {
                  registerUsingPhone();
                } else {
                  registerUsingEmail();
                }
              }}
            >
              <div className="grid md:grid-cols-2 md:gap-6">
                {/* Firstmname */}
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlhtmlFor="firstName"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                </div>

                {/* Lastname */}
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlhtmlFor="lastName"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                </div>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlhtmlFor="dob"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  DOB
                </label>
              </div>

              {/* Gender Drop */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Select Gender</p>
                <div className="w-full mb-6">
                  <button
                    onClick={() => {
                      handleDropdownChange("gender", !isDropdownOpen.gender);
                    }}
                    id="genderDropdownBtn"
                    className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                    type="button"
                  >
                    {dropdownData.gender === "M"
                      ? "Male"
                      : dropdownData.gender === "F"
                      ? "Female"
                      : "Others"}
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  <div
                    id="genderDropdown"
                    name="genderDropdown"
                    className={`${
                      isDropdownOpen.gender ? "absolute" : "hidden"
                    } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
                  >
                    <ul
                      className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                      aria-labelledby="dropdownSearchButton"
                    >
                      <li>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("gender", "M");
                            handleDropdownChange("gender", false);
                          }}
                        >
                          Male
                        </div>
                      </li>
                      <li>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("gender", "F");
                            handleDropdownChange("gender", false);
                          }}
                        >
                          Female
                        </div>
                      </li>
                      <li>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("gender", "O");
                            handleDropdownChange("gender", false);
                          }}
                        >
                          Others
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Role Dropdown */}
              <p className="text-sm text-gray-500 mb-2">Select Role</p>
              <div className="relative z-2 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange("role", !isDropdownOpen.role);
                  }}
                  id="roleDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                  type="button"
                >
                  {roleList[dropdownData.role]?.title}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="roleDropdown"
                  name="roleDropdown"
                  className={`${
                    isDropdownOpen.role ? "absolute" : "hidden"
                  } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
                >
                  <ul
                    className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {roleList.map((data, index) => (
                      <li key={data.id}>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("role", index);
                            handleDropdownChange("role", false);
                          }}
                        >
                          {data.title}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sub Role Dropdown */}

              {subRoleList.length === 0 ? (
                <></>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-2 mt-6">
                    Select Sub-Role
                  </p>
                  <div className="relative z-2 w-full mb-6 group">
                    <button
                      onClick={() => {
                        handleDropdownChange(
                          "subRole",
                          !isDropdownOpen.subRole
                        );
                      }}
                      id="subRoleDropdownBtn"
                      className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                      type="button"
                    >
                      {dropdownData.subRole}
                      <svg
                        className="w-2.5 h-2.5 ml-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="subRoleDropdown"
                      name="subRoleDropdown"
                      className={`${
                        isDropdownOpen.subRole ? "absolute" : "hidden"
                      } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
                    >
                      <ul
                        className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                        aria-labelledby="dropdownSearchButton"
                      >
                        {subRoleList.map((data, index) => (
                          <li key={index}>
                            <div
                              className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                              onClick={() => {
                                handleDropdownData("subRole", data);
                                handleDropdownChange("subRole", false);
                              }}
                            >
                              {data}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {/* Multi-select Post */}
              <p className="text-sm text-gray-500 mb-2">Select Post</p>
              <Select
                options={postList}
                isDisabled={postList.length === 0}
                isMulti
                value={selectedPostList}
                id="multi"
                name="multi"
                placeholder="Select Post"
                onChange={handlePostChange}
              />

              {/* Multi-select Emplo */}
              <p className="text-sm text-gray-500 mb-2 mt-6">
                Select Employment-Type
              </p>
              <Select
                options={employmentTypeList}
                value={selectedEmploymentTypeList}
                isDisabled={employmentTypeList.length === 0}
                isMulti
                id="multi"
                name="multi"
                placeholder="Select Employment-Type"
                onChange={handleEmploChange}
              />

              {/* Multi-select Speci */}
              <p className="text-sm text-gray-500 mb-2 mt-6">
                Select Specialization
              </p>
              <Select
                options={speciList}
                isMulti
                value={selectedSpeciList}
                isDisabled={speciList.length === 0}
                id="multi"
                name="multi"
                placeholder="Select Specialization"
                onChange={handleSpeciChange}
              />

              {/* Multi-select work */}
              <p className="text-sm text-gray-500 mb-2 mt-6">
                Select Work Setting
              </p>
              <Select
                options={workSettingList}
                isDisabled={workSettingList.length === 0}
                isMulti
                id="multi"
                name="multi"
                placeholder="Select Work Setting"
                onChange={handleWorkChange}
              />

              {/* Multi-select work */}
              <p className="text-sm text-gray-500 mb-2 mt-6">
                Select Graduation Type
              </p>
              <Select
                options={graduationTypeList}
                isDisabled={graduationTypeList.length === 0}
                isMulti
                value={selectedGraduationTypeList}
                id="multi"
                name="multi"
                placeholder="Select Graduation Type"
                onChange={handleGraduationChange}
              />

              {/* Graduation years */}
              {roleList[dropdownData.role]?.title === "Student" ? (
                <div className="relative z-0 w-full mb-6 mt-6 group">
                  <input
                    type="text"
                    name="graduationDate"
                    id="graduationDate"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required
                    value={graduationDate}
                    onChange={(e) => {
                      setgraduationDate(e.target.value);
                    }}
                  />
                  <label
                    htmlhtmlFor="graduationDate"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Graduation Date
                  </label>
                </div>
              ) : (
                <></>
              )}

              {/* experience Dropdown */}
              <p className="text-sm text-gray-500 mb-2 mt-6">
                Select Experience
              </p>
              <div className="relative z-2 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange(
                      "experience",
                      !isDropdownOpen.experience
                    );
                  }}
                  id="experienceDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                  type="button"
                >
                  {experienceList[dropdownData.experience]}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="experienceDropdown"
                  name="experienceDropdown"
                  className={`${
                    isDropdownOpen.experience ? "absolute" : "hidden"
                  } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
                >
                  <ul
                    className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {experienceList.map((data, index) => (
                      <li key={index}>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("experience", index);
                            handleDropdownChange("experience", false);
                          }}
                        >
                          {data}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlhtmlFor="city"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  City
                </label>
              </div>

              {/* state Dropdown */}
              <p className="text-sm text-gray-500 mb-2 mt-6">Select State</p>
              <div className="relative z-2 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange("state", !isDropdownOpen.state);
                  }}
                  id="stateDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                  type="button"
                >
                  {dropdownData.state}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="stateDropdown"
                  name="stateDropdown"
                  className={`${
                    isDropdownOpen.state ? "absolute" : "hidden"
                  } z-10 bg-white rounded-lg shadow w-[100%] light:bg-gray-700 pt-5 max-h-[200px] overflow-y-auto`}
                >
                  <ul
                    className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {stateList.map((data, index) => (
                      <li key={index}>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("state", data.stateName);
                            handleDropdownChange("state", false);
                          }}
                        >
                          {data.stateName}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative z-0 w-full mb-6 mt-6 group">
                <textarea
                  type="text"
                  name="address"
                  id="address"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlhtmlFor="address"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Address
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={registerType === "Email" ? email : null}
                />
                <label
                  htmlhtmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  E-mail
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  maxLength={10}
                  name="phone"
                  id="phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={registerType === "Phone" ? phone : null}
                />
                <label
                  htmlhtmlFor="phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone
                </label>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export default RegisterForm;
