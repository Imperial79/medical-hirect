import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

// 260325872424-9n8g36m2al70hb4rq7j875331chls19m.apps.googleusercontent.com
// 260325872424-9n8g36m2al70hb4rq7j875331chls19m.apps.googleusercontent.com

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="260325872424-9n8g36m2al70hb4rq7j875331chls19m.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>

);
