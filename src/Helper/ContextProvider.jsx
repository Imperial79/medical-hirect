import React, { useEffect, useState } from "react";

export const Context = React.createContext();

function ContextProvider(props) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [alert, setAlert] = useState({
    content: "",
    isDanger: false,
  });
  // const [parameter, setParameter] = useState({
  //   origin: "",
  //   body: {},
  // });

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

  // const navigator = useNavigate();

  // const auth = async () => {
  //   setAuthLoading(true);
  //   try {
  //     const response = await dbObject.post("/users/auth.php");
  //     if (!response.data["error"]) {
  //       setUser(response.data.response);
  //       navigator("/dashboard");
  //     } else {
  //       navigator("/");
  //     }
  //   } catch (error) {}
  //   setAuthLoading(false);
  // };

  const _id = (el) => {
    return document.getElementById(el);
  };

  useEffect(() => {
    // auth();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        alert,
        setAlert,
        _id,
        // authLoading,
        // auth,
        signupDetails,
        setsignupDetails,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
