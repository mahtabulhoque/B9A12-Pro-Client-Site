import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Surveys from "../Pages/Surveys/Surveys";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import Pricing from "../Pages/Pricing/Pricing";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import DashBoard from "../Layout/DashBoardLayout/DashBoard";
import PrivateRoutes from"../Routes/PrivateRoutes"

import CreateSurvey from "../Pages/DashBoard/Surveyor/CreateSurvey";
import Common from "../Pages/DashBoard/User/Common";
import ManageUsers from "../Pages/DashBoard/Admin/ManageUsers";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Vote from "../Pages/Home/Featured/Vote";
import View from "../Pages/DashBoard/Surveyor/View";
import Update from "../Pages/DashBoard/Surveyor/Update";
import UserSurvey from "../Pages/DashBoard/User/UserSurvey";
import MyReports from "../Pages/DashBoard/User/MyReports";
import Comments from "../Pages/DashBoard/User/Comments";
import Payment from "../Pages/Pricing/Payment";
// import ProUserRoutes from "../Routes/ProUserRoutes";
import SurveyorRoutes from "../Routes/SurveyorRoutes";
import ResponsePayment from "../Pages/DashBoard/Admin/ResponsePayment";
import AdminRoutes from "./AdminRoutes";
import TotalSurveys from "../Pages/DashBoard/Admin/TotalSurveys";
import TotalVotes from "../Pages/DashBoard/Admin/TotalVotes";
import ProUserRoutes from "./ProUserRoutes";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "surveys",
        element: <Surveys></Surveys>,
      },
      {
        path: "survey/:id",
        element: <SurveyDetails></SurveyDetails>,
        loader: ({ params }) => fetch(`https://b9a12-assignment-project.vercel.app/survey/${params.id}`),
      },
      {
        path: "price",
        element: <Pricing></Pricing>,
      },
      {
        path: "pay",
        element: <Payment></Payment>,
      },
      {
        path: "votes/:id",
        element: <PrivateRoutes><Vote></Vote></PrivateRoutes>,
        loader: ({ params }) => fetch(`https://b9a12-assignment-project.vercel.app/votes/${params.id}`),
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <LogIn></LogIn>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoard></DashBoard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Common></Common>,
      },
      {
        path: "create",
        element: <PrivateRoutes><SurveyorRoutes><CreateSurvey></CreateSurvey></SurveyorRoutes></PrivateRoutes>,
      },
      {
        path: "manage-users",
        element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>,
      },
      {
        path: "payment-response",
        element:<AdminRoutes><ResponsePayment></ResponsePayment></AdminRoutes>,
      },
      {
        path: "all-vote",
        element: <PrivateRoutes><AdminRoutes><TotalVotes></TotalVotes></AdminRoutes></PrivateRoutes>,
      },
      {
        path: "surveys",
        element: <PrivateRoutes><AdminRoutes><TotalSurveys></TotalSurveys></AdminRoutes></PrivateRoutes>,
      },
      {
        path: "view",
        element:
        <PrivateRoutes><SurveyorRoutes><View></View></SurveyorRoutes></PrivateRoutes>,
      },
      {
        path: "view/update/:id",
        element: <PrivateRoutes><SurveyorRoutes><Update></Update></SurveyorRoutes></PrivateRoutes>,
        loader: ({ params }) => fetch(`https://b9a12-assignment-project.vercel.app/survey/${params.id}`),
      },
      {
        path: "user-survey",
        element: <UserSurvey></UserSurvey>,
      },
      {
        path: "reported-survey",
        element:<PrivateRoutes><ProUserRoutes><MyReports></MyReports></ProUserRoutes></PrivateRoutes>,
      },
      {
        path: "survey-comment",
        element:
        <PrivateRoutes><ProUserRoutes><Comments></Comments></ProUserRoutes></PrivateRoutes>,
      },
     
    ],
  },
]);
