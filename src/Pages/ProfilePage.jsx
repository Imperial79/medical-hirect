import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import close from "../assets/close.svg";
import { Context } from "../Helper/ContextProvider";
import Scaffold from "../components/Scaffold";

function ProfilePage() {
  const { user } = useContext(Context);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [roleList, setroleList] = useState([
    {
      id: 1,
      title: "Select Role",
      subRole: [
        {
          id: 1,
          subRoleTitle: "Select Sub Role",
        },
      ],
      subPost: [
        {
          id: 1,
          subPostTitle: "Select Post",
        },
      ],
    },
  ]);

  const [dropdownData, setDropdownData] = useState({
    gender: "Select Gender",
    role: 0,
    subRole: "Select Sub-Role",
    state: "Select State",
    employmentType: "Select Employment Type",
  });

  const [isDropdownOpen, setDropdownOpen] = useState({
    gender: false,
    role: false,
    subRole: false,
    state: false,
    employmentType: false,
  });

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
  const handleTagAdd = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <Scaffold isLoading={user == null ? true : false}>
        <div className="pt-20 text-black">
          <div className="lg:w-[60%] md:w-[70%] w-full mx-auto mb-10 bg-white rounded-[20px] py-10 px-10 items-center justify-center  md:col-span-8 shadow-lg">
            <h1 className="text-[20px] mb-4">Edit Profile</h1>

            <div className="w-[70px] h-[70px] mb-10">
              <img
                src={user.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <form
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={user.firstName}
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_last_name"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={user.lastName}
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={user.dob}
                  />
                  <label
                    htmlFor="dob"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    DOB
                  </label>
                </div>
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

              {/* <div className="w-full mb-6">
                <button
                  onClick={() => {
                    handleDropdownChange("role", !isDropdownOpen.role);
                  }}
                  id="roleDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                  type="button"
                >
                  {roleList[dropdownData.role].title}
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
                      <li>
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
              </div> */}

              {/* <div className="w-full mb-6">
                <button
                  onClick={() => {
                    handleDropdownChange("subRole", !isDropdownOpen.subRole);
                  }}
                  id="subRoleDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                  type="button"
                >
                  {roleList[dropdownData.role].title}
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
                    {roleList[dropdownData.role].subRole.map((data, index) => (
                      <li>
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
              </div> */}

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={user.email}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              {/* <div className="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div> */}
              {/* <div className="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  name="repeat_password"
                  id="floating_repeat_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_repeat_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm password
                </label>
              </div> */}

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    maxLength={10}
                    name="phone"
                    id="phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={user.phone}
                  />
                  <label
                    htmlFor="phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone number
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_company"
                    id="floating_company"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={user.companyName}
                  />
                  <label
                    htmlFor="floating_company"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Company
                  </label>
                </div>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="location"
                  name="floating_location"
                  id="floating_location"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_location"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Location
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="job_title"
                  name="floating_job_title"
                  id="floating_job_title"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_job_title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Job Title
                </label>
              </div>

              <div className="relative w-full mb-6">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="inline-flex py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                  placeholder="Add tags..."
                />
                <div
                  onClick={handleTagAdd}
                  className="absolute top-0 right-0 h-full flex items-center pr-2 text-gray-500 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap -m-1 mb-5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 rounded-[10px] px-2 py-1 m-1 cursor-pointer flex items-center"
                  >
                    {tag}
                    <span onClick={() => handleTagRemove(tag)}>
                      <img src={close} alt="" className="h-5" />
                    </span>
                  </span>
                ))}
              </div>
              <Link to="/dashboard/profile">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
                >
                  Update Profile
                </button>
              </Link>
            </form>
          </div>
        </div>
      </Scaffold>
    </>
  );
}

export default ProfilePage;
