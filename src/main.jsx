import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Router';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
    <div className='max-w-[1440px] mx-auto my-6'>
    <RouterProvider router={router} />
    </div>
    </HelmetProvider>
  </React.StrictMode>
)
