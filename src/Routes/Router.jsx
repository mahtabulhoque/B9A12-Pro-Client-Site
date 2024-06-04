import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Surveys from "../Pages/Surveys/Surveys";
import SurveyDetails from "../Pages/SurveysDetails/SurveyDetails";
import Pricing from "../Pages/Pricing/Pricing";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
            
        },

        {

          path:'surveys',
          element:<Surveys></Surveys>

        },
        {
        

            path:'survey-details',
            element:<SurveyDetails></SurveyDetails>
  
          
        },
        {

          path:'price',
          element:<Pricing></Pricing>

        },
      ]
    },
  ]);