import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { Context } from "../Helper/ContextProvider";
import { dbObject } from "../Helper/Constants";
import { useNavigate } from "react-router-dom";
import { auth } from "../Helper/firebase-config";
import { signOut } from "firebase/auth";
import CircularProgressIndicator from "./CircularProgressIndicator";
import { KButton } from "./components";

function Navbar() {
  const { user, setUser, isScroll, setisScroll, authLoading } =
    useContext(Context);
  const [isNavMenuOpen, setisNavMenuOpen] = useState(false);
  const [isProfileDropOpen, setisProfileDropOpen] = useState(false);
  const navigator = useNavigate();

  // function onNavOpen() {
  //   let navBar = document.getElementById("navbar-sticky");

  //   if (navBar.classList.contains("hidden")) {
  //     navBar.classList.remove("hidden");
  //   } else {
  //     navBar.classList.add("hidden");
  //   }
  // }

  async function logOut() {
    setisProfileDropOpen(false);
    await dbObject.get("/users/logout.php");
    await signOut(auth);
    setUser(null);
    navigator("/login", { replace: true });
  }

  return (
    <>
      <nav className="drop-shadow-sm bg-white light:bg-gray-900 fixed w-full z-20 top-0 left-0 items-center">
        <div className="w-full flex flex-wrap items-center justify-between p-4">
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-32 mr-3" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2">
            <Link
              id="post-job"
              to="https://recruiter.shapon.tech"
              target="_blank"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
            >
              Post Job
            </Link>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              onClick={() => {
                setisNavMenuOpen(!isNavMenuOpen);
              }}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 light:text-gray-400 light:hover:bg-gray-700 light:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isNavMenuOpen ? "" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="md:items-center flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white light:bg-gray-800 md:light:bg-gray-900 light:border-gray-700">
              <li>
                <button
                  onClick={() => {
                    navigator("/");
                    setisScroll(true);
                  }}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:light:hover:text-blue-500 light:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700"
                >
                  Search Job Profile
                </button>
              </li>
              <li>
                <Link
                  to="/jobs-recruiter"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:light:hover:text-blue-500 light:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700"
                >
                  Search Recruiters
                </Link>
              </li>
              {authLoading ? (
                <CircularProgressIndicator size={5} />
              ) : user !== null ? (
                <li>
                  <div
                    onClick={() => {
                      setisProfileDropOpen(!isProfileDropOpen);
                    }}
                    className="flex items-center gap-3 cursor-pointer select-none"
                  >
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 light:focus:ring-gray-600 md:ml-0 ml-2"
                      id="user-menu-button"
                      aria-expanded="false"
                      data-dropdown-toggle="user-dropdown"
                      data-dropdown-placement="bottom"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.image}
                        alt="user photo"
                      />
                    </button>
                    <p className="text-black">{user?.firstName}'s Profile</p>
                  </div>
                  <ProfileMenu
                    isDropOpen={isProfileDropOpen}
                    user={user}
                    logOut={logOut}
                    setDrop={setisProfileDropOpen}
                  />
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 pl-3 pr-4 text-blue-700 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:light:hover:text-blue-500 light:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700 hover:underline"
                  >
                    Login
                  </Link>
                </li>
              )}

              {/* {user !== null ? (
                <li>
                  <button
                    onClick={() => {
                      setisProfileDropOpen(!isProfileDropOpen);
                    }}
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 light:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.image}
                      alt="user photo"
                    />
                  </button>
                  <ProfileMenu
                    isDropOpen={isProfileDropOpen}
                    user={user}
                    logOut={logOut}
                    setDrop={setisProfileDropOpen}
                  />
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 pl-3 pr-4 text-blue-700 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:light:hover:text-blue-500 light:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700 hover:underline"
                  >
                    Login
                  </Link>
                </li>
              )} */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

function ProfileMenu({ isDropOpen, setDrop, user, logOut }) {
  function MenuBtn({ label, to, toggleDrop }) {
    return (
      <li>
        <Link
          to={to}
          onClick={() => {
            toggleDrop(false);
          }}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 light:hover:bg-gray-600 light:text-gray-200 light:hover:text-white"
        >
          {label}
        </Link>
      </li>
    );
  }
  return (
    <div
      className={`${
        isDropOpen ? "absolute" : "hidden"
      } z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow light:bg-gray-700 light:divide-gray-600`}
      id="user-dropdown"
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 light:text-white">
          {user.firstName} {user.lastName}
        </span>
        <span className="block text-sm  text-gray-500 truncate light:text-gray-400">
          {user.email}
        </span>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">
        <MenuBtn
          to="/dashboard/bookmarked-applications"
          label="Bookmarked Applications"
          toggleDrop={setDrop}
        />
        <MenuBtn
          to="/dashboard/applied-applications"
          label="Applied Applications"
          toggleDrop={setDrop}
        />
        <MenuBtn
          to="/dashboard/profile"
          label="Edit Profile"
          toggleDrop={setDrop}
        />
        <MenuBtn
          to="/dashboard/manage-resumes"
          label="Manage Resumes"
          toggleDrop={setDrop}
        />
        <MenuBtn
          to="/dashboard/resume-builder"
          label="Resume Builder"
          toggleDrop={setDrop}
        />
        <li>
          <button
            type="button"
            onClick={logOut}
            className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 light:hover:bg-gray-600 light:text-gray-200 light:hover:text-white"
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
}
