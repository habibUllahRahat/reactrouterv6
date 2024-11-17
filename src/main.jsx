import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([ //for multiple path routing we need to use array of an Object where each object represent a path
 {
path:'/', //a path '/' represent which directory the elemnt or component wil be shown at browser link part
element:<h1>Hello World</h1>//Here we willl set element or component to this correspondig path
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* Here we will replace <App/> with  */}
    <RouterProvider router={router}/>
    {/* Here, router atrribute will recive the path and element cotained object and set which componenet or element to render which path */}
  </StrictMode>,
)