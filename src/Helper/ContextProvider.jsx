import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { dbObject } from "./Constants";

export const Context = React.createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [alert, setAlert] = useState({
    content: "",
    isDanger: false,
  });
  const location = new useLocation();

  const [signupDetails, setsignupDetails] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
    height: "",
    qualification: "",
    address: "",
    aadhaarNumber: "",
    ppaRemark: "",
    recentSelfie: "",
    kycDocument: "",
    kycFrontImage: "",
    kycBackImage: "",
    fcmToken: "",
  });

  const navigator = useNavigate();
  const auth = async () => {
    setAuthLoading(true);
    try {
      const response = await dbObject.post("/users/auth.php");

      if (!response.data["error"]) {
        setUser(response.data.response);
      }
      navigator(location.pathname + location.search);
    } catch (error) {}
    setAuthLoading(false);
  };

  const _id = (el) => {
    return document.getElementById(el);
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        alert,
        setAlert,
        _id,
        authLoading,
        signupDetails,
        setsignupDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
