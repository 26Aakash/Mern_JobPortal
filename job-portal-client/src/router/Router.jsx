import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import About from "../pages/About";
import Blog from "../pages/Blog";
import CreateJob from "../pages/CreateJob";
import Home from "../pages/Home";
import ApplicationDetails from "../pages/ApplicationDetails";
import AdminDashboard from "../pages/AdminDashboard";
import JobDetails from "../pages/JobDetails";
import JobsPage from "../pages/JobsPage";
import Login from "../pages/Login";
import MyJobs from "../pages/MyJobs";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import UpdateJob from "../pages/UpdateJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "blog", element: <Blog /> },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "my-job",
        element: (
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "jobs",
        element: (
          <PrivateRoute>
            <JobsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "applications/new",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <CreateJob />
          </PrivateRoute>
        ),
      },
      {
        path: "post-job",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <CreateJob />
          </PrivateRoute>
        ),
      },
      {
        path: "applications/:id",
        element: (
          <PrivateRoute>
            <ApplicationDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "applications/:id/edit",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-job/:id",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <Signup /> },
]);

export default router;
