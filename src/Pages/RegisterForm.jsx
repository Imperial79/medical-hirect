import React, { useContext, useEffect, useState } from "react";
import doctor from "../assets/doctor.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { dbObject, experienceList } from "../Helper/Constants";
import Select from "react-select";
import { Context } from "../Helper/ContextProvider";
import Scaffold from "../components/Scaffold";
import {
  KButton,
  KDropDown,
  KGrid,
  KTextArea,
  KTextField,
} from "../components/components";

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
    window.scrollTo(0, 0);
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
              <KGrid margin="md:mb-5 mb-0">
                <KTextField
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <KTextField
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </KGrid>

              <KGrid margin="md:mb-5 mb-0">
                <KTextField type="date" name="dob" id="dob" label="DOB" />

                <KDropDown
                  id="genderDropdown"
                  label="Select Gender"
                  onClick={() => {
                    handleDropdownChange("gender", !isDropdownOpen.gender);
                  }}
                  value={
                    dropdownData.gender === "M"
                      ? "Male"
                      : dropdownData.gender === "F"
                      ? "Female"
                      : "Others"
                  }
                  isDropOpen={isDropdownOpen.gender}
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
                </KDropDown>
              </KGrid>

              <KGrid margin="md:mb-5 mb-0">
                <KDropDown
                  id="roleDropdownBtn"
                  label="Select Role"
                  onClick={() => {
                    handleDropdownChange("role", !isDropdownOpen.role);
                  }}
                  isDropOpen={isDropdownOpen.role}
                  value={roleList[dropdownData.role]?.title}
                >
                  {roleList.map((data, index) => (
                    <li key={index}>
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
                </KDropDown>
                {subRoleList.length > 0 ? (
                  <KDropDown
                    id="subRoleDropdownBtn"
                    label="Select Sub-Role"
                    onClick={() => {
                      handleDropdownChange("subRole", !isDropdownOpen.subRole);
                    }}
                    isDropOpen={isDropdownOpen.subRole}
                    value={dropdownData.subRole}
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
                  </KDropDown>
                ) : (
                  <></>
                )}
              </KGrid>

              {/* Multi-select Post */}
              <label className={`block mb-2 text-sm font-medium text-gray-900`}>
                Select Post
              </label>
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
              <label
                className={`mt-5 block mb-2 text-sm font-medium text-gray-900`}
              >
                Select Employment-Type
              </label>
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
              <label
                className={`mt-5 block mb-2 text-sm font-medium text-gray-900`}
              >
                Select Specialization
              </label>
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
              <label
                className={`mt-5 block mb-2 text-sm font-medium text-gray-900`}
              >
                Select Work Setting
              </label>
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
              <label
                className={`mt-5 block mb-2 text-sm font-medium text-gray-900`}
              >
                Select Graduation Type
              </label>
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

              {roleList[dropdownData.role]?.title === "Student" ? (
                <KTextField
                  id="graduationDate"
                  name="graduationDate"
                  label="Graduation Date"
                  placeholder="Eg. 2019-2022"
                  margin="mt-5"
                  value={graduationDate}
                  onChange={(e) => {
                    setgraduationDate(e.target.value);
                  }}
                />
              ) : (
                <></>
              )}

              <KGrid margin="md:mb-5 mb-0 mt-5">
                <KDropDown
                  id="experienceDropdownBtn"
                  onClick={() => {
                    handleDropdownChange(
                      "experience",
                      !isDropdownOpen.experience
                    );
                  }}
                  isDropOpen={isDropdownOpen.experience}
                  label="Select Experience"
                  value={experienceList[dropdownData.experience]}
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
                </KDropDown>

                <KTextField
                  name="city"
                  id="city"
                  label="City"
                  placeholder="Enter your city"
                />
              </KGrid>

              <KDropDown
                id="stateDropdownBtn"
                onClick={() => {
                  handleDropdownChange("state", !isDropdownOpen.state);
                }}
                label="Select State"
                value={dropdownData.state}
                isDropOpen={isDropdownOpen.state}
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
              </KDropDown>

              <KTextArea
                name="address"
                id="address"
                label="Address"
                placeholder="Enter your address"
              />

              <KGrid margin="md:mb-5 mb-0 mt-5">
                <KTextField
                  name="email"
                  id="email"
                  label="E-mail"
                  placeholder="Enter E-mail"
                  value={registerType === "Email" ? email : null}
                />
                <KTextField
                  name="phone"
                  id="phone"
                  maxLength={10}
                  label="Phone"
                  placeholder="Enter Phone"
                  value={registerType === "Phone" ? phone : null}
                />
              </KGrid>

              <KButton type="submit" label="Register" />
            </form>
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export default RegisterForm;
