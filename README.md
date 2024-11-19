# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
** Here we need use ':' in path like this '/contacts/:contactId' cause it will be dynamic path

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
	},
])

	//To:
	const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: getContactsLoader,
		action: createContactAction,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Index /> },
					{
						path: "/contacts/:contactId",
						element: <Contact />,
						loader: getContactLoader,
						action: setFavoriteAction,
					},
					{
						path: "/contacts/:contactId/edit",
						element: <EditContact />,
						loader: getContactLoader,
						action: updateContactAction,
					},
					{
						path: "/contacts/:contactId/destroy",
						action: deleteContactAction,
						errorElement: (
							<h1>Try again later</h1>
						),
					},
				],
			},
		],
	},
])

** For the Children routes we can also use `pathless` routing we add:
```const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: getContactsLoader,
		action: createContactAction,
		children: [
			{errorElement: <ErrorPage />
			children: [
				{ index: true, element: <Index /> },
			{
				path: "/contacts/:contactId",
				element: <Contact />,
				loader: getContactLoader,
				action: setFavoriteAction,
			},
			{
				path: "/contacts/:contactId/edit",
				element: <EditContact />,
				loader: getContactLoader,
				action: updateContactAction,
			},
			{
				path: "/contacts/:contactId/destroy",
				action: deleteContactAction,
				errorElement: <h1>Try again later</h1>,
			},
		],
	},
])
]
},
			
])

**Here, `{errorElement: <ErrorPage />,children: [existing routes]}` if any of the children routes have errorElement explicitly it wil render that to the <Outlet/> else it will render the errorElement from the root's -> children route
*/
//! JSX Routes
/** 
**And for our final trick, many folks prefer to configure their routes with JSX. You can do that with createRoutesFromElements.
**There is no functional difference between JSX or objects when configuring your routes, it's simply a stylistic preference.
```jsx
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);
```
