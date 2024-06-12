import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Surveys from "../Pages/Surveys/Surveys";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import Pricing from "../Pages/Pricing/Pricing";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import DashBoard from "../Layout/DashBoardLayout/DashBoard";

import CreateSurvey from "../Pages/DashBoard/Surveyor/CreateSurvey";
import Common from "../Pages/DashBoard/User/Common";
import ManageUsers from "../Pages/DashBoard/Admin/ManageUsers";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Vote from "../Pages/Home/Featured/Vote";
import View from "../Pages/DashBoard/Surveyor/View";
import Update from "../Pages/DashBoard/Surveyor/Update";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "surveys",
        element: <Surveys></Surveys>,
      },
      {
        path: "/survey/:id",
        element: <SurveyDetails></SurveyDetails>,
        loader:({params}) => fetch(`http://localhost:5000/survey/${params.id}`),
      },
      {
        path: "price",
        element: <Pricing></Pricing>,
      },
      {
        path:'votes/:id',
        element:<Vote></Vote>,
        loader:({params}) => fetch(`http://localhost:5000/survey/${params.id}`),
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
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        index:true,
        element: <Common></Common>
      },
      {
        path: "create",
        element: <CreateSurvey></CreateSurvey>,
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path:'view',
        element:<View></View>
      },
      {
        path: 'update/:id',
        element: <Update></Update>,
        loader: ({ params }) => fetch(`http://localhost:5000/survey/${params.id}`)
      }
      
    ],
  },
]);
