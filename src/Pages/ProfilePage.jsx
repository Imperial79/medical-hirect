import React, { useContext, useEffect, useState } from "react";
import { dbObject, experienceList } from "../Helper/Constants";
import { Context } from "../Helper/ContextProvider";
import Scaffold from "../components/Scaffold";
import {
  KButton,
  KDropDown,
  KGrid,
  KTextArea,
  KTextField,
} from "../components/components";

function ProfilePage() {
  const { _id, setAlert, user } = useContext(Context);
  const [imagePreview, setImagePreview] = useState(null);
  const [graduationDate, setgraduationDate] = useState("");

  const [loading, setloading] = useState(false);
  const [roleList, setroleList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [dropdownData, setDropdownData] = useState({
    gender: "Select Gender",
    role: 0,
    subRole: "Select Sub-Role",
    state: "0",
    experience: "0",
  });

  const [isDropdownOpen, setDropdownOpen] = useState({
    gender: false,
    role: false,
    subRole: false,
    state: false,
    experience: false,
  });

  const [textField, setTextField] = useState({
    bio: user != null ? user.bio : "",
    firstName: user != null ? user.firstName : "",
    lastName: user != null ? user.lastName : "",
    dob: user != null ? user.dob : "",
    role: user != null ? user.roleTitle : "",
    subRole: user != null ? user.subRole : "",
    city: user != null ? user.city : "",
    address: user != null ? user.address : "",
    email: user != null ? user.email : "",
    phone: user != null ? user.phone : "",
    post: JSON.parse(user !== null ? user?.post : "[]"),
    employmentType: JSON.parse(user !== null ? user?.employmentType : "[]"),
    specialization: JSON.parse(user !== null ? user?.specialization : "[]"),
    workSetting: JSON.parse(user !== null ? user?.workSetting : "[]"),
    graduationType: JSON.parse(user !== null ? user?.graduationType : "[]"),
  });

  useEffect(() => {
    setTextField({
      bio: user != null ? user.bio : "",
      firstName: user != null ? user.firstName : "",
      lastName: user != null ? user.lastName : "",
      dob: user != null ? user.dob : "",
      role: user != null ? user.roleTitle : "",
      subRole: user != null ? user.subRole : "",
      city: user != null ? user.city : "",
      address: user != null ? user.address : "",
      email: user != null ? user.email : "",
      phone: user != null ? user.phone : "",
      post: JSON.parse(user !== null ? user?.post : "[]"),
      employmentType: JSON.parse(user !== null ? user?.employmentType : "[]"),
      specialization: JSON.parse(user !== null ? user?.specialization : "[]"),
      workSetting: JSON.parse(user !== null ? user?.workSetting : "[]"),
      graduationType: JSON.parse(user !== null ? user?.graduationType : "[]"),
    });

    setgraduationDate(user != null ? user.graduationDate : "");
    setImagePreview(user?.image ?? null);
    setDropdownData({
      gender: user?.gender,
      role: user?.roleId,
      experience: user?.experience,
      state: user?.state,
      subRole: user?.subRole,
    });
  }, [user]);

  const handleDropdownChange = (dropdownName, value) => {
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
  };

  const handleInputChange = (e) => {
    setTextField({
      ...textField,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------functions----------------->

  useEffect(() => {
    fetchRole();
    fetchState();
  }, []);

  async function uploadImage() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("mediaFile", _id("imageInput").files[0]);
      const response = await dbObject.post("/users/update-dp.php", formData);
      setLoading(false);
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
  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      uploadImage();
    }
  };

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

  async function updateProfile() {
    try {
      setloading(true);
      const formData = new FormData();

      formData.append("bio", _id("bio").value);
      formData.append("firstName", _id("firstName").value);
      formData.append("lastName", _id("lastName").value);
      formData.append("dob", _id("dob").value);
      formData.append("experience", dropdownData.experience);
      formData.append("gender", dropdownData.gender);
      formData.append("subRole", dropdownData.subRole);
      formData.append("specialization", user?.specialization);
      formData.append("post", user?.post);
      formData.append("phone", phone);
      formData.append("email", _id("email").value);
      formData.append("address", _id("address").value);
      formData.append("city", _id("city").value);
      formData.append("state", dropdownData.state);
      formData.append("roleId", roleList[dropdownData.role]?.id);
      formData.append("employmentType", user?.employmentType);
      formData.append("workSetting", user?.workSetting);
      formData.append("graduationType", user?.graduationType);
      formData.append("graduationDate", graduationDate);
      formData.append("fcmToken", "");

      const response = await dbObject.post(
        "/users/update-profile.php",
        formData
      );

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
    <Scaffold isLoading={loading || user === null}>
      <div className="pt-20 md:pb-10 text-black">
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile();
          }}
        >
          <FormCard
            heading="Edit Profile"
            subHeading="Enter your details"
            method="POST"
          >
            <ImagePicker
              handleImageChange={handleImageChange}
              imagePreview={imagePreview}
              user={user}
            />
            <KTextArea
              id="bio"
              name="bio"
              label="Bio"
              placeholder="Something about you ..."
              value={textField.bio}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <KGrid crossAxisCount={2} gap={5} margin="mb-0">
              <KTextField
                name="firstName"
                id="firstName"
                placeholder=""
                label="First Name"
                value={textField.firstName}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <KTextField
                name="lastName"
                id="lastName"
                placeholder=""
                label="Last Name"
                value={textField.lastName}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </KGrid>

            <div className="relative z-0 w-full mb-6 group">
              <KTextField
                label="DOB"
                type="date"
                name="dob"
                id="dob"
                placeholder=""
                value={textField.dob}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </div>

            <KGrid crossAxisCount={2} gap={5} margin="mb-0">
              {/* Gender Drop */}

              <KDropDown
                id="gender"
                label="Gender"
                onClick={() => {
                  handleDropdownChange("gender", !isDropdownOpen.gender);
                }}
                isDropOpen={isDropdownOpen.gender}
                value={
                  dropdownData.gender === "M"
                    ? "Male"
                    : dropdownData.gender === "F"
                    ? "Female"
                    : "Others"
                }
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
                      handleDropdownChange("gender", !isDropdownOpen.gender);
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
                      handleDropdownChange("gender", !isDropdownOpen.gender);
                    }}
                  >
                    Others
                  </div>
                </li>
              </KDropDown>

              {/* Role Textfield */}
              <KTextField
                type="text"
                name="role"
                id="role"
                label="Role"
                placeholder="role"
                readOnly={true}
                value={textField.role}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </KGrid>

            {/* Subrole textfield */}
            <KTextField
              name="subRole"
              id="subRole"
              label="Sub-Role"
              placeholder="Subrole"
              readOnly={true}
              value={textField.subRole}
            />

            {/* Multi-select Post */}
            <MultiSelectedData
              label="Selected Post"
              dataList={textField?.post}
            />

            {/* Multi-select Emplo */}
            <MultiSelectedData
              label="Selected Employement Type"
              dataList={textField?.employmentType}
            />

            {/* Multi-select Speci */}
            <MultiSelectedData
              label="Selected Specialization"
              dataList={textField?.specialization}
            />

            {/* Multi-select work */}
            <MultiSelectedData
              label="Selected Work Setting"
              dataList={textField?.workSetting}
            />

            {/* Multi-select grad */}
            <MultiSelectedData
              label="Selected Graduation Type"
              dataList={textField?.graduationType}
            />
            {/* Graduation years */}
            {textField.role === "Student" ? (
              <KTextField
                label="Graduation Date"
                type="text"
                name="graduationDate"
                id="graduationDate"
                placeholder=""
                value={graduationDate}
                onChange={(e) => {
                  setgraduationDate(e.target.value);
                }}
              />
            ) : (
              <></>
            )}

            <KGrid crossAxisCount={2} gap={5} margin="mb-0">
              <KDropDown
                label="Select Experience"
                id="experience"
                name="experience"
                onClick={() => {
                  handleDropdownChange(
                    "experience",
                    !isDropdownOpen.experience
                  );
                }}
                value={dropdownData.experience}
                isDropOpen={isDropdownOpen.experience}
              >
                {experienceList.map((data, index) => (
                  <li key={index}>
                    <div
                      className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                      onClick={() => {
                        handleDropdownData("experience", data);
                        handleDropdownChange(
                          "experience",
                          !isDropdownOpen.experience
                        );
                      }}
                    >
                      {data}
                    </div>
                  </li>
                ))}
              </KDropDown>
              <KTextField
                label="City"
                name="city"
                id="city"
                placeholder=""
                value={textField.city}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </KGrid>

            <KGrid margin="mb-0" alignment="start">
              <KDropDown
                label="Select State"
                id="state"
                isDropOpen={isDropdownOpen.state}
                onClick={() => {
                  handleDropdownChange("state", !isDropdownOpen.state);
                }}
                value={dropdownData.state}
              >
                {stateList.map((data, index) => (
                  <li key={index}>
                    <div
                      className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                      onClick={() => {
                        handleDropdownData("state", data.stateName);
                        handleDropdownChange("state", !isDropdownOpen.state);
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
                value={textField.address}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </KGrid>

            <KGrid>
              <KTextField
                name="email"
                id="email"
                label="E-mail"
                placeholder=""
                required
                readOnly
                value={textField.email}
              />

              <KTextField
                type="phone"
                maxLength={10}
                name="phone"
                id="phone"
                label="Phone Number"
                placeholder=""
                required
                readOnly
                value={textField.phone}
              />
            </KGrid>

            <KButton type="submit" label="Update Profile" />
          </FormCard>
        </form>
      </div>
    </Scaffold>
  );
}

export default ProfilePage;

function MultiOptionsPill({ label }) {
  return (
    <div className="bg-gray-600 text-sm text-white px-3 py-2 rounded-full">
      {label}
    </div>
  );
}

function MultiSelectedData({ label, dataList }) {
  return (
    <div className={`${dataList.length === 0 ? "hidden" : ""} mb-5`}>
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex flex-wrap md:mt-2 mt-2 gap-2">
        {dataList.map((data, index) => (
          <div key={index}>
            <MultiOptionsPill label={data} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ImagePicker({ handleImageChange, imagePreview, user }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <input
        id="imageInput"
        className="hidden"
        type="file"
        accept=".jpeg, .jpg, .png, .webp"
        onChange={handleImageChange}
      />
      <div
        onClick={() => {
          document.getElementById("imageInput").click();
        }}
        className="h-14 w-14 bg-white inline-flex rounded-full border cursor-pointer"
      >
        <img
          src={imagePreview ?? user?.image}
          alt="profile"
          className="h-full w-full object-cover rounded-full"
        />
      </div>
      <div>
        <h2 className="text-blue-600 font-medium">Upload photo</h2>
        <p className="text-gray-500 font-normal text-sm">
          Allowed file formats: jpg, jpeg, png, webp
        </p>
      </div>
    </div>
  );
}

function FormCard({ heading, subHeading, children }) {
  return (
    <>
      <div className="mx-5 text-black md:max-w-[900px] lg:mx-auto content-center">
        <h1 className="mt-5 md:text-[25px] text-[20px] text-start font-medium text-black">
          {heading}
        </h1>
        <p className="text-sm text-start font-normal text-gray-500 mb-5">
          {subHeading}
        </p>
        <div
          // method={method}
          // onSubmit={onSubmit}
          className="border border-gray-200 md:p-7 p-5 rounded-xl bg-white"
        >
          {children}
        </div>
      </div>
    </>
  );
}
