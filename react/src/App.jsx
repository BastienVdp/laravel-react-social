import React, { useEffect } from 'react'
import { useLocation } from "react-router";
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider'
import router from "./router"
import './index.css'



export default function App() {

  return (
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
  )
}
