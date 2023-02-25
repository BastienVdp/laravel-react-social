import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider'
import router from "./router"

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
)
