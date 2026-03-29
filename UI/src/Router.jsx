import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Authlayout from "./layouts/Authlayout.jsx";

import HomePage from "./Pages/Home.jsx";
import CoursePage from "./Pages/CoursePage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";

import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";

import Dashboard from "./Pages/UserDashboard.jsx";
import AddCoursePage from "./Pages/AddCourse.jsx";
import EditCoursePage from "./Pages/UpdateCourse.jsx";
import Notfoundpage from "./Pages/Notfoundpage.jsx";
import CertificationPage from "./Pages/CertificationPage.jsx";
import CourseManagementAdmin from "./Pages/CourseManagementAdmin.jsx";
import AddActivity from "./Pages/AddActivity.jsx";
import PaymentPage from "./Pages/PaymentPage.jsx";
import UploadMaterial from "./Pages/UploadMaterial.jsx";
import CourseDetail from "./Pages/CourseDetail.jsx";
import AdminCertification from "./Pages/AdminCertification.jsx";

// ✅ NEW IMPORT
import UsersPage from "./Pages/UsersPage.jsx";

import Protected from "./routes/Protected.jsx";

export const router = createBrowserRouter([
  {
    element: <Authlayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/courses", element: <CoursePage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },

  {
    element: <Protected role="admin" />,
    children: [
      { path: "/add-course", element: <AddCoursePage /> },
      { path: "/edit-course/:courseName", element: <EditCoursePage /> },
      { path: "/course-management", element: <CourseManagementAdmin /> },
      { path: "/add-activity", element: <AddActivity /> },
      { path: "/upload-material", element: <UploadMaterial /> },
      { path: "/admin-certification", element: <AdminCertification /> },

      
      { path: "/users", element: <UsersPage /> },
    ],
  },

  {
    element: <Protected />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/certification", element: <CertificationPage /> },
      { path: "/payment", element: <PaymentPage /> },
      { path: "/course/:courseId", element: <CourseDetail /> },
    ],
  },

  {
    path: "*",
    element: <Notfoundpage />,
  },
]);