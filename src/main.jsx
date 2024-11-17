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

// ! Nested Routing
/** 
* ! Now it will call the Contact component inside the Root component but it won't show at first because we have to set the path where it will be called
* * Now we have to set the path where this component will be called by using React Router DOM' sepcial component called <Outlet/> at src/routes/root.jsx

*/
const router = createBrowserRouter([
	//for multiple path routing we need to use array of an Object where each object represent a path
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/contacts/:contactId",
				element: <Contact />,
				errorElement: <ErrorPage />,
			},
		],
	},
	,
])

createRoot(document.getElementById("root")).render(
	<StrictMode>
		{/* <App /> */}
		{/* Here we will replace <App/> with  */}
		<RouterProvider router={router} />
		{/* Here, router atrribute will recive the path and element cotained object and set which componenet or element to render which path */}
	</StrictMode>
)
