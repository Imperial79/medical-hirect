import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import doctor from "../assets/doctor.svg";
import logo from "../assets/logo.jpg";
import googleLogo from "../assets/google.png";
import { auth, googleProvider } from "../Helper/firebase-config";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { dbObject } from "../Helper/Constants";
import { Context } from "../Helper/ContextProvider";
import Scaffold from "../components/Scaffold";
import { KTextField } from "../components/components";
import CircularProgressIndicator from "../components/CircularProgressIndicator";

function LoginPage() {
  const { setUser, showAlert } = useContext(Context);
  const navigator = useNavigate();
  const [loading, setloading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [textField, setTextField] = useState({
    phone: "",
    otp: "",
  });

  // Function to change input
  const handleInputChange = (e) => {
    setTextField({
      ...textField,
      [e.target.name]: e.target.value,
    });
  };

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

      signInWithPopup(auth, googleProvider)
        .then(async (result) => {
          const user = result.user;
          console.log(user.email);
          console.log(user.uid);

          const formData = new FormData();
          formData.append("email", user.email);
          formData.append("guid", user.uid);
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
                  email: user.email,
                  guid: user.uid,
                },
              });
            } else {
              showAlert(response.data.message, response.data.error);
            }
          }
        })
        .catch((error) => {
          showAlert(error.message, true);
        });
    } catch (error) {
      console.log("Error Here");
    }
  };

  async function sendOTP() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("phone", textField.phone);
      const response = await dbObject.post(
        "/sms-service/send-otp.php",
        formData
      );
      if (!response.data.error) {
        startTimer();

        if (response.data.action == "Register") {
          setIsRegister(true);
        } else {
          setIsRegister(false);
        }
      }

      showAlert(response.data.message, response.data.error);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  async function verifyOTP() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("phone", textField.phone);
      formData.append("otp", textField.otp);
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
              phone: textField.phone,
              otp: textField.otp,
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
      formData.append("phone", textField.phone);
      formData.append("otp", textField.otp);
      formData.append("fcmToken", "");
      const response = await dbObject.post(
        "/users/login-with-phone.php",
        formData
      );
      if (!response.data.error) {
        setUser(response.data.response);
        navigator("/", { replace: true });
      } else {
        showAlert(response.data.message, response.data.error);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  return (
    <Scaffold isLoading={loading}>
      <div className="pt-20 md:px-10 p-5 text-black">
        <div className="bg-[#f8f8f8] p-2 rounded-[20px] lg:max-w-[900px] md:w-full w-[100%] mx-auto md:flex">
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
              <h1 className="text-[15px] text-gray-500 font-normal text-center mb-5">
                Enter your details
              </h1>

              <KTextField
                pattern="^[0-9]{1,10}$"
                name="phone"
                id="phone"
                maxLength={10}
                placeholder="Enter your phone number"
                label="Phone"
                value={textField.phone}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />

              <KTextField
                pattern="^[0-9]{1,10}$"
                name="otp"
                id="otp"
                maxLength={5}
                placeholder="XXXXX"
                label="OTP"
                spacing="[10px]"
                value={textField.otp}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />

              {isTimerRunning ? (
                <div className="flex items-center">
                  <CircularProgressIndicator size={5} margin="mr-2" />
                  <h1 className="text-sm text-gray-500 font-medium">
                    Resend OTP in {timer} secs
                  </h1>
                </div>
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
                className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                Proceed
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-neutral-600 bg-white">
                    Or continue with
                  </span>
                </div>
              </div>
              {/* <GoogleLogin
                onSuccess={(response) => {
                  console.log(response);
                }}
                onError={(response) => {
                  console.log(response);
                }}
              /> */}
              <button
                onClick={signInWithGoogle}
                type="button"
                className=" text-black bg-gray-200 hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
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
