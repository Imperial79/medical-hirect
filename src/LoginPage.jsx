import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import doctor from "./assets/doctor.svg";
import logo from "./assets/logo.png";
import googleLogo from "./assets/google.png";

function LoginPage() {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  let otp = "";
  const navigator = useNavigate();

  const handleInputChange = (e, index) => {
    const inputValue = e.target.value;

    if (inputValue.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    } else if (inputValue.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
    otp += inputValue;

    if (otp.length == 4) {
      navigator("/register");
    }
  };
  return (
    <>
      <div className="pt-20 md:px-10 md:pb-10 text-black ">
        <div className="bg-[#f8f8f8] p-2 rounded-[20px] md:w-[60%] md:mx-auto m-5  md:flex">
          <img
            src={doctor}
            alt=""
            className="md:w-[40%] my-20 mx-20 hidden md:block"
          />

          <div className="bg-white rounded-[20px] py-10 px-10 items-center justify-center md:w-1/2">
            <img src={logo} alt="" className="h-5 mx-auto" />
            <h1 className="mt-10 text-[25px] font-semibold mx-auto text-center">
              Welcome back!
            </h1>
            <h1 className="text-[15px] text-gray-500 font-normal text-center">
              Enter your details
            </h1>

            <div className="mt-5 relative z-0 w-full mb-6 group">
              <input
                type="phone"
                name="floating_phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>
            </div>

            <div className="flex space-x-4 items-center justify-center">
              {inputRefs.map((inputRef, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-12 h-12 text-center border rounded-lg focus:outline-none"
                  placeholder={index + 1}
                  maxLength={1}
                  ref={inputRef}
                  onChange={(e) => handleInputChange(e, index)}
                />
              ))}
            </div>

            <button
              type="submit"
              className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              Send OTP
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-neutral-600 bg-white">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 text-black bg-gray-200 hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              <div className="flex justify-center gap-2">
                <img src={googleLogo} alt="" className="h-5" />
                <h1 className="">Sign in with Google</h1>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
