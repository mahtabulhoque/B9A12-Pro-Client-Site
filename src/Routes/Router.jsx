import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Surveys from "../Pages/Surveys/Surveys";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import Pricing from "../Pages/Pricing/Pricing";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import DashBoard from "../Layout/DashBoard/DashBoard";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
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
        path: "survey-details",
        element: <SurveyDetails></SurveyDetails>
      },
      {
        path: "price",
        element: <Pricing></Pricing>,
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
    element:<DashBoard></DashBoard>,
    children:[
      
    ]
  },
]);
