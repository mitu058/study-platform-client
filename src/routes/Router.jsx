import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CreateStudySession from "../Role/Tutor/CreateStudySession.jsx";
import ViweStudySession from "../Role/Tutor/ViweStudySession.jsx";
import ViewAllUser from "../Role/Admin/ViewAllUser.jsx";
import ViewAllStudySession from "../Role/Admin/ViewAllStudySession.jsx";
import UpdateSession from "../Role/Admin/UpdateSession";
import UploadMaterials from "../Role/Tutor/UploadMaterials.jsx";
import ViewMaterials from "../Role/Tutor/ViewMaterials.jsx";
import ViewAllMaterials from "../Role/Admin/ViewAllMaterials.jsx";
import SessionCard from "../Role/Student/SessionCard.jsx";
import SessionDetails from "../Role/Student/SessionDetails.jsx";
import Payment from "../payment/payment.jsx";
import CreateNote from "../Role/Student/CreatNote.jsx";
import ManageNote from "../Role/Student/ManageNote.jsx";
import ViewBookedSession from "../Role/Student/ViewBookedSession.jsx";
import BookedSessionDetails from "../Role/Student/BookedSessionDetails.jsx";
import BookMaterials from "../Role/Student/BookMaterials.jsx";
import PrivateAdmin from "./PrivateAdmin.jsx";
import PrivateTutor from "./PrivateTutor.jsx";
import PrivateStudent from "./PrivateStudent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path:'/sessionDetails/:id',
        element:<SessionDetails></SessionDetails>
      },
      {
         path:'/payment/:id',
         element:<Payment></Payment>
      },
      {
        path:'/booked-session-details/:id',
        element:<BookedSessionDetails></BookedSessionDetails>,
        loader:({params}) => fetch(`http://localhost:5000/booked-session/details/${params.id}`)
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Tutor route
      {
        path: "create-study-session",
        element: <PrivateTutor><CreateStudySession></CreateStudySession></PrivateTutor>,
      },
      {
        path: "view-study-sessions",
        element: <PrivateTutor><ViweStudySession></ViweStudySession></PrivateTutor>,
      },
      {
        path: "upload-materials",
        element: <PrivateTutor><UploadMaterials></UploadMaterials></PrivateTutor>
      },
      {
        path:'view-materials',
          element: <PrivateTutor><ViewMaterials></ViewMaterials></PrivateTutor>
      },

      // Admin routes
      {
        path: "View-all-users",
        element: <PrivateAdmin><ViewAllUser></ViewAllUser></PrivateAdmin>,
      },
      {
        path: "view-all-study-session",
        element: <PrivateAdmin><ViewAllStudySession></ViewAllStudySession></PrivateAdmin>,
      },
      {
        path: "update-session/:id",
        element: <PrivateAdmin><UpdateSession></UpdateSession></PrivateAdmin>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/update-session/${params.id}`),
      },
      {
        path:'view-all-materials',
        element:<PrivateAdmin><ViewAllMaterials></ViewAllMaterials></PrivateAdmin>
      },

      // student route
      {
        path:'creatNote',
        element:<PrivateStudent><CreateNote></CreateNote></PrivateStudent>
      },
      {
        path:'manageNote',
        element:<PrivateStudent><ManageNote></ManageNote></PrivateStudent>
      },
      {
        path:'booked-session',
        element:<PrivateStudent><ViewBookedSession></ViewBookedSession></PrivateStudent>
      },
      {
        path:'book-materials',
        element:<PrivateStudent><BookMaterials></BookMaterials></PrivateStudent>
      }
    
    ],

  },
]);

export default router;
