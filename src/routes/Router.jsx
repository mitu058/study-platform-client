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
        element: <CreateStudySession></CreateStudySession>,
      },
      {
        path: "view-study-sessions",
        element: <ViweStudySession></ViweStudySession>,
      },
      {
        path: "upload-materials",
        element:<UploadMaterials></UploadMaterials>
      },
      {
        path:'view-materials',
          element:<ViewMaterials></ViewMaterials>
      },

      // Admin routes
      {
        path: "View-all-users",
        element: <ViewAllUser></ViewAllUser>,
      },
      {
        path: "view-all-study-session",
        element: <ViewAllStudySession></ViewAllStudySession>,
      },
      {
        path: "update-session/:id",
        element: <UpdateSession></UpdateSession>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/update-session/${params.id}`),
      },
      {
        path:'view-all-materials',
        element:<ViewAllMaterials></ViewAllMaterials>
      },

      // student route
      {
        path:'creatNote',
        element:<CreateNote></CreateNote>
      }
    
    ],

  },
]);

export default router;
