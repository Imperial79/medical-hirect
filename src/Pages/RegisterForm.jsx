import React, { useContext, useEffect, useState } from "react";
import doctor from "../assets/doctor.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { dbObject, experienceList } from "../Helper/Constants";
import Select from "react-select";
import { Context } from "../Helper/ContextProvider";
import Scaffold from "../components/Scaffold";
import {
  KDropDown,
  KGrid,
  KTextArea,
  KTextField,
} from "../components/components";

function RegisterForm() {
  const { _id, showAlert, setUser } = useContext(Context);
  const location = useLocation();
  const navigator = useNavigate();

  let otp = location.state?.otp;
  let phone = location.state?.phone;
  let email = location.state?.email;
  let guid = location.state?.guid;
  let registerType = location.state?.type;

  const [loading, setloading] = useState(false);
  const [roleList, setroleList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [subRoleList, setSubRoleList] = useState(["Select Sub-Role"]);
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

  const changeSubCategory = (index) => {
    if (roleList[index].subRoles !== "NULL") {
      setSubRoleList(JSON.parse(roleList[index].subRoles));
    } else {
      setSubRoleList([]);
    }

    let temp = [];
    setselectedPostList([]);

    if (roleList[index].posts !== "NULL") {
      const parsedPosts = JSON.parse(roleList[index].posts);
      temp = parsedPosts.map((data) => ({ label: data, value: data }));
      setpostList(temp);
    } else {
      setpostList([]);
    }

    if (roleList[index].employmentType !== "NULL") {
      const parsedEmplo = JSON.parse(roleList[index].employmentType);
      temp = parsedEmplo.map((data) => ({ label: data, value: data }));
      setemploymentTypeList(temp);
    } else {
      setemploymentTypeList([]);
    }

    if (roleList[index].specialization !== "NULL") {
      const parsedSpeci = JSON.parse(roleList[index].specialization);
      temp = parsedSpeci.map((data) => ({ label: data, value: data }));
      setspeciList(temp);
    } else {
      setspeciList([]);
    }

    if (roleList[index].workSetting !== "NULL") {
      const parsedWork = JSON.parse(roleList[index].workSetting);
      temp = parsedWork.map((data) => ({ label: data, value: data }));
      setworkSettingList(temp);
    } else {
      setworkSettingList([]);
    }
    if (roleList[index].graduationType !== "NULL") {
      const parsedWork = JSON.parse(roleList[index].graduationType);
      temp = parsedWork.map((data) => ({ label: data, value: data }));
      setgraduationTypeList(temp);
    } else {
      setgraduationTypeList([]);
    }
  };

  const [textField, setTextField] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    city: "",
    address: "",
    graduationDate: "",
    email: email,
    phone: phone,
  });

  // Function to change input
  const handleInputChange = (e) => {
    setTextField({
      ...textField,
      [e.target.name]: e.target.value,
    });
  };
  // ---------------functions----------------->

  useEffect(() => {
    if (location.state == null) {
      navigator("/", { replace: true });
    } else {
      otp = location.state.otp;
      phone = location.state.phone;
      email = location.state.email;
      guid = location.state.guid;
      registerType = location.state.type;
      window.scrollTo(0, 0);
      fetchRole();
      fetchState();
    }
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
    if (_id("gender").value === "Select Gender") {
      showAlert("Select Gender", true);
      return;
    }

    if (subRoleList.length > 0 && _id("subRole").value === "Select Sub-Role") {
      showAlert("Select Sub-Role", true);
      return;
    }
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

      formData.append("firstName", textField.firstName);
      formData.append("lastName", textField.lastName);
      formData.append("dob", textField.dob);
      formData.append("gender", _id("gender"));
      formData.append("phone", phone);
      formData.append("email", textField.email);
      formData.append("otp", otp);
      formData.append("experience", _id("experience").value);
      formData.append("specialization", JSON.stringify(speciList));
      formData.append("address", textField.address);
      formData.append("city", textField.city);
      formData.append("state", _id("state").value);
      formData.append("roleId", roleList[_id("role").value]?.id);
      formData.append(
        "subRole",
        _id("subRole").value === "Select Sub-Role" ? "" : _id("subRole").value
      );
      formData.append("post", JSON.stringify(postList));
      formData.append("employmentType", JSON.stringify(emploList));
      formData.append("workSetting", JSON.stringify(workSettingList));
      formData.append("graduationType", JSON.stringify(gradTypeList));
      formData.append("graduationDate", textField.graduationDate);
      formData.append("fcmToken", "");

      const response = await dbObject.post(
        "/users/register-with-phone.php",
        formData
      );

      if (!response.data.error) {
        setUser(response.data.response);
        navigator("/", { replace: true });
      } else {
        showAlert(response.data.message, true);
      }

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  async function registerUsingEmail() {
    if (_id("gender").value === "Select Gender") {
      showAlert("Select Gender", true);
      return;
    }

    if (subRoleList.length > 0 && _id("subRole").value === "Select Sub-Role") {
      showAlert("Select Sub-Role", true);
      return;
    }

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
      formData.append("firstName", textField.firstName);
      formData.append("lastName", textField.lastName);
      formData.append("dob", textField.dob);
      formData.append("gender", _id("gender").value);
      formData.append("phone", textField.phone);
      formData.append("email", email);
      formData.append("otp", otp);
      formData.append("experience", _id("experience").value);
      formData.append("address", textField.address);
      formData.append("city", textField.city);
      formData.append("state", _id("state").value);
      formData.append("roleId", roleList[_id("role").value]?.id);
      formData.append(
        "subRole",
        _id("subRole").value === "Select Sub-Role" ? "" : _id("subRole").value
      );
      formData.append("post", JSON.stringify(postList));
      formData.append("specialization", JSON.stringify(speciList));
      formData.append("employmentType", JSON.stringify(emploList));
      formData.append("workSetting", JSON.stringify(workSettingList));
      formData.append("graduationType", JSON.stringify(gradTypeList));
      formData.append("graduationDate", textField.graduationDate);
      formData.append("fcmToken", "");

      const response = await dbObject.post(
        "/users/register-with-google.php",
        formData
      );

      if (!response.data.error) {
        setUser(response.data.response);
        navigator("/", { replace: true });
      } else {
        showAlert(response.data.message, true);
      }

      setloading(false);
    } catch (error) {
      console.log(error);
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
              <KGrid margin="md:mb-0 mb-0">
                <KTextField
                  name="firstName"
                  id="firstName"
                  placeholder="Enter your first name"
                  label="First Name"
                  value={textField.firstName}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />

                <KTextField
                  name="lastName"
                  id="lastName"
                  placeholder="Enter your last name"
                  label="Last Name"
                  value={textField.lastName}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </KGrid>

              <KGrid margin="md:mb-0 mb-0">
                <KTextField
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Enter your date of birth"
                  label="DOB"
                  value={textField.dob}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />

                <KDropDown id="gender" name="gender" label="Select Gender">
                  <option key={1} value={"M"}>
                    Male
                  </option>
                  <option key={2} value={"F"}>
                    Female
                  </option>
                  <option key={3} value={"O"}>
                    Others
                  </option>
                </KDropDown>
              </KGrid>

              <KGrid margin="md:mb-0 mb-0">
                <KDropDown
                  id="role"
                  name="role"
                  label="Select Role"
                  onChange={(e) => {
                    changeSubCategory(e.target.value);
                  }}
                >
                  {roleList.map((data, index) => (
                    <option key={index} value={index}>
                      {data.title}
                    </option>
                  ))}
                </KDropDown>

                {subRoleList.length > 0 ? (
                  <KDropDown
                    id="subRole"
                    name="subRole"
                    label="Select Sub-Role"
                  >
                    {subRoleList.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
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

              {/* Multi-select graduation */}
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

              {roleList[_id("role") ? _id("role").value : 0]?.title ===
              "Student" ? (
                <KTextField
                  name="graduationDate"
                  id="graduationDate"
                  placeholder="Eg. 2019-2022"
                  label="Graduation Year"
                  margin="mt-5"
                  value={textField.graduationDate}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              ) : (
                <></>
              )}

              <KGrid margin="md:mb-0 mb-0 mt-5">
                <KDropDown
                  id="experience"
                  name="experience"
                  label="Select Experience"
                >
                  {experienceList.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </KDropDown>

                <KTextField
                  name="city"
                  id="city"
                  placeholder="Enter your city"
                  label="City"
                  value={textField.city}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </KGrid>

              <KDropDown id="state" name="state" label="Select State">
                {stateList.map((data, index) => (
                  <option key={index} value={data.stateName}>
                    {data.stateName}
                  </option>
                ))}
              </KDropDown>

              <KTextArea
                name="address"
                id="address"
                placeholder="Enter your address"
                label="Address"
                value={textField.address}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />

              <KGrid margin="md:mb-0 mb-0">
                <KTextField
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter E-mail"
                  label="E-mail"
                  value={textField.email}
                  readOnly={registerType === "Email"}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />

                <KTextField
                  pattern="^[0-9]{1,10}$"
                  name="phone"
                  id="phone"
                  placeholder="Enter phone"
                  label="Phone"
                  value={textField.phone}
                  readOnly={registerType === "Phone"}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </KGrid>

              <button
                type="submit"
                className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                Register
              </button>

              {/* <KButton type="submit" label="Register" /> */}
            </form>
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export default RegisterForm;
