import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom"
import "./index.css"
import { getContactsLoader } from "./loaders/contactsLoaders"
import { createContactAction } from "./actions/actions"
import Contact from "./routes/contact"
import ErrorPage from "./routes/error-page"
import Root from "./routes/root"
// ! Handling error
/**
** If try to go to an path which dosen't exist it will show a default error pag
** But we can set this Error page what ever we want
** Lets create an Error page at src/error-page.jsx 
// TODO: create src/error-page.jsx
/**
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
 */
// ! Nested Routing
/** 
* ! Now it will call the Contact component inside the Root component but it won't show at first because we have to set the path where it will be called
* * Now we have to set the path where this component will be called by using React Router DOM' sepcial component called <Outlet/> at src/routes/root.jsx

const router = createBrowserRouter([
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

*/

//! Client side Routing
/** 
 * ! We can see that when every time we click on achor tag it will reload the page for routing we don't want this behavior so we have to use client side routing
 * * For This we need o replace <a> tag with React Router DOM's <Link/> tag at src/routes/root.jsx and replace href={`/contacts/1`} with to={`/contacts/1`} cause fro Link component we have to set the path where it will be called usin 'to={link}' attribute
* * Now we have to import <Link/> from React Router DOM at src/routes/root.jsx and replace <a> tag with <Link>
* * Now we can see that when we click on Linked tag it will not reload the page
const router = createBrowserRouter([
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
 */

//! Loaders
/**
 * ! When land on a page we might need to get data from an API or database for React Router DOM we have to use loaders
 * * For this we need to make some function for each page and set it as a loader at src/routes/root.jsx
** Now we have to import getContactsLoader from src/loaders/contactsLoaders.js and set it as a 'loader' key value pair `loader:getContactsLoader,`
** for use this loimport Root from './routes/root';
**loader data we need use `useLoaderData()` from `React Router DOM`, this will return the data which we get from loader. 'const contacts = useLoaderData();' at src/routes/root.jsx
** loaders for get data from API or database
** Now we can see that when we click on Linked tag it will not reload the page
*/

// ! Action
/** 
 * ! We can use actions to handle form data to POST or PUT data to API or database

** For use this we need to create an action folder where will create our action files 

** Now we have to import createContact from Contacts.jsx to action.js file and create a async funtion call createContactAction at action.js file

** Now we have to import createContactAction from action.js file and set it as a 'action' key value pair `action:createContactAction,`

** React Router DOM will call this action when we submit the form and this from can't be html from then React Router DOM won't be able to catch its data for this React Router DOM provide us another spcial component called <Form/> at src/routes/contact.jsx
*/
const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: getContactsLoader,
    action: createContactAction,
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
