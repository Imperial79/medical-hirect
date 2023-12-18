import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import doctor from "../assets/doctor.svg";
import logo from "../assets/logo.jpg";
import googleLogo from "../assets/google.png";
import { auth, googleProvider } from "../Helper/firebase-config";
import { signInWithCredential, signInWithPopup, signOut } from "firebase/auth";
import { dbObject } from "../Helper/Constants";
import { Context } from "../Helper/ContextProvider";
import FullScreenLoading from "../components/FullScrenLoading";
import Scaffold from "../components/Scaffold";

function LoginPage() {
  const { setUser, setAlert } = useContext(Context);
  const navigator = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setloading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Function to start the timer
  const startTimer = () => {
    setTimer(60);
    setIsTimerRunning(true);
  };

  // Effect to handle the timer countdown
  useEffect(() => {
    let countdown;
    if (isTimerRunning && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [isTimerRunning, timer]);

  // Effect to handle the timer reaching zero
  useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer]);

  const signInWithGoogle = async () => {
    try {
      await signOut(auth);
      const data = await signInWithPopup(auth, googleProvider);
      const formData = new FormData();
      formData.append("email", data?.user?.email);
      formData.append("guid", data?.user?.uid);
      formData.append("fcmToken", "");

      const response = await dbObject.post(
        "/users/login-with-google.php",
        formData
      );
      if (!response.data.error) {
        setUser(response.data.response);
        navigator("/", {
          replace: true,
        });
      } else {
        if (response.data.action === "Register") {
          navigator("/register", {
            replace: true,
            state: {
              type: "Email",
              phone: "",
              otp: "",
              email: data?.user.email,
              guid: data?.user.uid,
            },
          });
        } else {
          setAlert({
            content: response.data.message,
            isDanger: response.data.error,
          });
        }
      }
    } catch (error) {
      setAlert({
        content: error,
        isDanger: true,
      });
    }
  };

  async function sendOTP() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("phone", phone);
      const response = await dbObject.post(
        "/sms-service/send-otp.php",
        formData
      );
      if (!response.data.error) {
        setIsOtpSent(true);
        startTimer();

        if (response.data.action == "Register") {
          setIsRegister(true);
        } else {
          setIsRegister(false);
        }
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

  async function verifyOTP() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("otp", otp);
      const response = await dbObject.post(
        "/sms-service/verify-otp.php",
        formData
      );
      if (!response.data.error) {
        if (isRegister) {
          navigator("/register", {
            replace: true,
            state: {
              type: "Phone",
              phone: phone,
              otp: otp,
              email: "",
              guid: "",
            },
          });
        } else {
          loginWithPhone();
        }
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  async function loginWithPhone() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("otp", otp);
      formData.append("fcmToken", "");
      const response = await dbObject.post(
        "/users/login-with-phone.php",
        formData
      );
      if (!response.data.error) {
        setUser(response.data.response);
        navigator("/", { replace: true });
        // history.replace("/");
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
      <div className="pt-20 md:px-10 p-5 text-black">
        <div className="bg-[#f8f8f8] p-2 rounded-[20px] lg:w-[70%] md:w-full w-[100%] mx-auto md:flex">
          <img
            src={doctor}
            className="md:w-1/2 w-0 md:m-10 m-0 hidden md:block"
          />

          <div className="bg-white rounded-[20px] py-10 px-10 items-center justify-center lg:w-1/2 md:w-1/2 w-full">
            <form
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                if (isRegister) {
                  verifyOTP();
                } else {
                  loginWithPhone();
                }
              }}
            >
              <img src={logo} alt="" className="md:w-[70%] w-[200px] mx-auto" />

              <h1 className="mt-10 text-[25px] font-semibold mx-auto text-center">
                Welcome back!
              </h1>
              <h1 className="text-[15px] text-gray-500 font-normal text-center">
                Enter your details
              </h1>

              <div className="mt-5 relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  maxLength={10}
                  name="floating_phone"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone
                </label>
              </div>

              <div className="mt-5 relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  maxLength={5}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer tracking-[10px]"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="otp"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  OTP
                </label>
              </div>
              {isTimerRunning ? (
                <h1 className="text-sm text-gray-500 font-medium">
                  Resend OTP in {timer} secs
                </h1>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    sendOTP();
                  }}
                  type="button"
                  className="text-blue-700 font-medium hover:text-blue-400 hover:underline rounded-full"
                >
                  Send OTP
                </button>
              )}

              <button
                type="submit"
                className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                Proceed
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
                onClick={signInWithGoogle}
                type="button"
                className="mt-5 text-black bg-gray-200 hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                <div className="flex justify-center gap-2">
                  <img src={googleLogo} alt="" className="h-5" />
                  <h1 className="">Sign in with Google</h1>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export default LoginPage;
