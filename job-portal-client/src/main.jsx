import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import AuthProvider from "./context/AuthProvider";
import JobsProvider from "./context/JobsProvider";
import router from "./router/Router";

document.title = "Job Tracker";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <JobsProvider>
        <RouterProvider router={router} />
      </JobsProvider>
    </AuthProvider>
  </React.StrictMode>
);
