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
  const { _id, showAlert, user } = useContext(Context);
  const [imagePreview, setImagePreview] = useState(null);
  const [graduationDate, setgraduationDate] = useState("");

  const [loading, setloading] = useState(false);
  const [stateList, setStateList] = useState([]);

  const [dropdownData, setDropdownData] = useState({
    gender: "Select Gender",
    role: 0,
    subRole: "Select Sub-Role",
    state: "0",
    experience: "0",
  });

  const [textField, setTextField] = useState({
    bio: user != null ? user.bio : "",
    firstName: user != null ? user.firstName : "",
    lastName: user != null ? user.lastName : "",
    gender: user != null ? user.gender : "",
    dob: user != null ? user.dob : "",
    role: user != null ? user.roleTitle : "",
    subRole: user != null ? user.subRole : "",
    city: user != null ? user.city : "",
    state: user != null ? user.state : "",
    experience: user != null ? user.experience : "",
    address: user != null ? user.address : "",
    email: user != null ? user.email : "",
    phone: user != null ? user.phone : "",
    graduationDate: user != null ? user.graduationDate : "",
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
      gender: user != null ? user.gender : "",
      dob: user != null ? user.dob : "",
      role: user != null ? user.roleTitle : "",
      subRole: user != null ? user.subRole : "",
      city: user != null ? user.city : "",
      state: user != null ? user.state : "",
      experience: user != null ? user.experience : "",
      address: user != null ? user.address : "",
      email: user != null ? user.email : "",
      phone: user != null ? user.phone : "",
      graduationDate: user != null ? user.graduationDate : "",
      post: JSON.parse(user !== null ? user?.post : "[]"),
      employmentType: JSON.parse(user !== null ? user?.employmentType : "[]"),
      specialization: JSON.parse(user !== null ? user?.specialization : "[]"),
      workSetting: JSON.parse(user !== null ? user?.workSetting : "[]"),
      graduationType: JSON.parse(user !== null ? user?.graduationType : "[]"),
    });

    setgraduationDate(user != null ? user.graduationDate : "");
    setImagePreview(user?.image ?? null);
  }, [user]);

  const handleInputChange = (e) => {
    setTextField({
      ...textField,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------functions----------------->

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchState();
  }, []);

  async function uploadImage() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("mediaFile", _id("imageInput").files[0]);
      const response = await dbObject.post("/users/update-dp.php", formData);
      setloading(false);
      showAlert(response.data.message, response.data.error);
    } catch (error) {
      setloading(false);
      showAlert("Sorry from inconvenience! Please try again.", true);
    }
  }
  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      uploadImage();
    }
  };

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

      formData.append("firstName", textField.firstName);
      formData.append("lastName", textField.lastName);
      formData.append("dob", textField.dob);
      formData.append("experience", textField.experience);
      formData.append("specialization", user?.specialization);
      formData.append("gender", textField.gender);
      formData.append("subRole", textField.subRole);
      formData.append("post", user?.post);
      formData.append("bio", textField.bio);
      formData.append("employmentType", user?.employmentType);
      formData.append("workSetting", user?.workSetting);
      formData.append("graduationType", user?.graduationType);
      formData.append("graduationDate", textField.graduationDate);
      formData.append("address", textField.address);
      formData.append("city", textField.city);
      formData.append("state", textField.state);

      const response = await dbObject.post(
        "/users/update-profile.php",
        formData
      );

      showAlert(response.data.message, response.data.error);

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

            <KGrid crossAxisCount={2} gap={5} margin="mb-0">
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
              <KDropDown
                id="gender"
                name="gender"
                label="Gender"
                value={textField.gender}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              >
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

            <KGrid crossAxisCount={2} gap={5} margin="mb-0">
              <KTextField
                name="role"
                id="role"
                label="Role"
                placeholder="role"
                readOnly={true}
                value={textField.role}
              />
              <KTextField
                name="subRole"
                id="subRole"
                label="Sub-Role"
                placeholder="Subrole"
                value={textField.subRole}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </KGrid>

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
                value={textField.graduationDate}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            ) : (
              <></>
            )}

            <KGrid crossAxisCount={2} gap={5} margin="mb-0">
              <KDropDown
                id="experience"
                name="experience"
                label="Select Experience"
                value={textField.experience}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              >
                {experienceList.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </KDropDown>
              {/* <KDropDown
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
              </KDropDown> */}
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
                id="state"
                name="state"
                label="Select State"
                value={textField.state}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              >
                {stateList.map((data, index) => (
                  <option key={index} value={data.stateName}>
                    {data.stateName}
                  </option>
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
