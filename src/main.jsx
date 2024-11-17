import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom"
import "./index.css"
import Contact from "./routes/contact"
import ErrorPage from "./routes/error-page"
import Root from "./routes/root"

// ! Handling error
/**
** If try to go to an path which dosen't exist it will show a default error pag
** But we can set this Error page what ever we want
** Lets create an Error page at src/error-page.jsx 
// TODO: create src/error-page.jsx
*/
const router = createBrowserRouter([
	//for multiple path routing we need to use array of an Object where each object represent a path
	{
		path: "/", //a path '/' represent which directory the elemnt or component wil be shown at browser link part
		element: <Root />, //Here we willl set element or component to this correspondig path
		errorElement: <ErrorPage />, // it will be shown if any error occur deuring rendering
	},
	{
		path: "/contacts/:contactId", //a path '/' represent which directory the elemnt or component wil be shown at browser link part
		element: <Contact />, //Here we willl set element or component to this correspondig path
		errorElement: <ErrorPage />, // it will be shown if any error occur deuring rendering
	},
])

createRoot(document.getElementById("root")).render(
	<StrictMode>
		{/* <App /> */}
		{/* Here we will replace <App/> with  */}
		<RouterProvider router={router} />
		{/* Here, router atrribute will recive the path and element cotained object and set which componenet or element to render which path */}
	</StrictMode>
)
