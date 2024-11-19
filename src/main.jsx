import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom"
import {
	createContactAction,
	deleteContactAction,
	setFavoriteAction,
	updateContactAction,
} from "./actions/actions"
import "./index.css"
import {
	getContactLoader,
	getContactsLoader,
} from "./loaders/contactsLoaders"
import Index from "./routes"
import Contact from "./routes/contact"
import EditContact from "./routes/edit"
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

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: getContactsLoader,
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

// ! Action
/** 
 * ! We can use actions to handle form data to POST or PUT data to API or database

** For use this we need to create an action folder where will create our action files 

** Now we have to import createContact from `Contacts.jsx` to ``action.js`` file and create a async funtion call `createContactAction` at ``action.js`` file

** Now we have to import createContactAction from `action.js` file and set it as a 'action' key value pair `action:createContactAction,`

** React Router DOM will call this action when we submit the form and this from can't be html from then React Router DOM won't be able to catch its data for this React Router DOM provide us another spcial component called <Form/> at src/routes/contact.jsx

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

*/

// ! URL Params in Loaders

/**
*! Now After completing the action we need to create a loader for get single contact for passing id to loader so that we can get single contact data

**For this we need to create a loader function call `getContactLoader(params.contactId)` from `src/loaders/contactsLoaders.js` 
* ! when we pass the loader to the router we don't need to pass the params to the loader, cause React Router DOM will pass the params to the loader
*! For grab the parameter for dynamic path we need to use at `getContactLoader(params.contactId)` same keyword `'contactId'` after the ':'  
** if we use `contacts/:id` then we need to use `params.id`

** Now we have to import getContact from src/loaders/contactsLoaders.js and set it as a 'loader' key value pair `loader:getContactLoader,`

**For show single contact data we need to use useLoaderData() at src/routes/edit.jsx and clean the current contact data from the loader data and set it to a variable `const {contact} = useLoaderData();`

** Adderss bar will be like this 'http://localhost:5173/contacts/1/edit' and by clicking on 'Edit' button the address bar will be like this 'http://localhost:5173/contacts/1/edit' so that we edit that corresponding contact

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
				loader: getContactLoader,
			},
			{
				path: "/contacts/:contactId/edit",
				element: <EditContact />,
				errorElement: <ErrorPage />,
				loader: getContactLoader,
			},
		],
	},
	
])
*/

// ! Updating Contact with Action(using `redirect`, action request(3rd ref) and params(2nd ref))
/**
 * ! Here now we will update the contact data by creating an action function call updateContactAction from src/actions/actions.js

** =>```export async function updateContactAction({ request, params }) {
	const formData = await request.formData() //! here we get the data from the form
	const updates = Object.fromEntries(formData) //! here we are converting the from data into an object
	await updateContact(params.contactId, updates) //! here we update the contact which is from the src/contact.js
	return redirect(`/contacts/${params.contactId}`) //?redirecting to the contact page using redirect function from react-router-dom```
** Now we have to `import updateContactAction` from `src/actions/actions`.js and set it as a 'action' key value pair `action:updateContactAction,`

** Now we can update the from and click save will update the contact
	

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
				loader: getContactLoader,
			},
			{
				path: "/contacts/:contactId/edit",
				element: <EditContact />,
				errorElement: <ErrorPage />,
				loader: getContactLoader,
				action: updateContactAction,
			},
		],
	},
])

 */
// ! Active Link styling (using '`active`' class provided by React Router DOM <NavLink></NavLink>)

/**
 * ! In the UI there is no way to tell which link is active or which link is not active
 ** To do this we need to use 'active' class provided by React Router DOM` <NavLink></NavLink>` insted of `<Link></Link>`
 ** Now we have to import <NavLink/> from React Router DOM at src/routes/root.jsx and replace ``<Link>`` tag with `<NavLink> `at `src/routes/root.jsx`
 ** Then we will be able to style the active link from the `NavLink`
 ** NavLink component provide a callback function in side of className, this callback function provide isActive and isPending
 *! `<NavLink to="/contacts/${contact.id}"`` className={({isActive, isPending}) => isActive ? "active" :isPending ? "pending" : ""}>`
** NavLink also provide a `active` attribute which will be set to true when the link is active and false when the link is not active 

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
				loader: getContactLoader,
			},
			{
				path: "/contacts/:contactId/edit",
				element: <EditContact />,
				errorElement: <ErrorPage />,
				loader: getContactLoader,
				action: updateContactAction,
			},
		],
	},
])
 */

//! Global UI (using `useNavigation()` hook)
/**
 * ! We can see that when we click on a conatact name it will appear in the UI in it's place by using `<Outlet/>`, the app feels a little unresponsive as click between the list and the contact page.
	**=> so we need provide some sort feedback indicator to let the user know that the page is content is loading.
* * Now we have to import `useNavigation()` hook from React Router DOM at `src/routes/root.jsx`
 ** Then we will store `useNavigation()` hook in a variable called `navigation` and use it in `src/routes/root.jsx` to that `div` where `<Outlet/>` is present
	```
	const navigation = useNavigation()
	return (
		<div id="details" className={navigation.state === "loading" ? "loading" : ""}>
			<Outlet />
		</div>
	)
```
*/
//! Deleting Contact (using `action:deleteContactAction`)
/**
 * ! Now we have to create an action function call deleteContactAction from src/actions/actions.js
** =>```export async function deleteContactAction({ params }) {
	await deleteContact(params.contactId)
	return redirect("/")
}
** Now we have to import `deleteContactAction` from `src/actions/actions.js` and set it as a 'action' key value pair `action:deleteContactAction,`	
** Now we can delete the contact by clicking on delete button on the contact page
const router = createBrowserRouter([
  {
    path: "/",
    // existing root route props 
    children: [
      // existing routes 
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
]);
*? Here we saw we dont need make another UI to route we make a dummy route for deleting the contact we ust redirect to '/'

** now we will see how to handle error for deleting the contact let's see:
	**1. Update `deleteContactAction` at `src/actions/actions.js` by adding throw Error (`throw new Error("Try again later")`)
	**2. Now we will add `errorElement` to main.jsx like this errorElement: <h1>Try again later</h1> 
```
const router = createBrowserRouter([
  {
    path: "/",
    // existing root route props 
    children: [
      // existing routes 
      {
		path: "/contacts/:contactId/destroy",
		action: deleteContactAction,
		errorElement: <h1>Try again later</h1>,
	},
    ],
  },
]);
```
*/

// ! Cancel Button (using `useNavigate()` hook)
/**
 * ! Now we have to import `useNavigate()` hook from React Router DOM at `src/routes/root.jsx`
** Now we will store `useNavigate()` hook in a variable called `navigate` and use it in `src/routes/edit.jsx` to that `button` where `'Cancel'` is present 
```
const navigate = useNavigate()
return (
	<div>
		//existing code
<p>
				<button type='submit'>Save</button>
				<button type='button' onClick={() => navigate(-1)}>Cancel</button>
			</p>
		</Form>
	)
}
```
*/

//! Index Route
/** 
*! When we land on the root path `/` we want to show some content on the UI
**=> so we need to create a root route for `/` which our `index.jsx` file at `src/routes/index.jsx`
*? We will put this elemt in to `children[]` of `main.jsx` cause in `<Outlet/>` we are using `children[]`
```
// existing code
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
	  // existing routes 
    ],
  },
]);

```
*/
//! Search Route(using `matchSorter` by catching the search query through) get-submissions-with-client-side-routing
/**
 * ! We can see when we type into search bar it appear in the Address bar like this `http://localhost:5173/?query=hello` beacause the iput field type is `search`
 * * But we want to GET the data so we need to replace `<from>` tag with react router dom's `<Form/>` tag
 * * Now we have to update our getContactsLoader function
    **From**

```
	export async function getContactsLoader() {
	const contacts = await getContacts()
	console.log(contacts)
	return { contacts }
}
```

	**To**
```
	export async function getContactsLoader({ request }) { //! Here we can get our search query through `request`
	const url = new URL(request.url);//! Here we can get our search query through `request.url`
	const q = url.searchParams.get("query");//! Here we can get our search query through `url.searchParams.get("q")`
	const contacts = await getContacts(q);
	console.log(contacts,q)
	return { contacts }
}
```
* * Now it will appear in the Address bar like this `http://localhost:5173/?query=hello`
 */

//! Syncronizing URL to Form State (Adding `q` 's value by returning `q` from `getContactsLoader` function)
/** 
* ! Now we have to update our getContactsLoader function
**From**
```
	export async function getContactsLoader() {
	const contacts = await getContacts()
	console.log(contacts)
	return { contacts }
}
```
**To**
```
	export async function getContactsLoader({ request }) { //! Here we can get our search query through `request`
	const url = new URL(request.url);//! Here we can get our search query through `request.url`
	const q = url.searchParams.get("query");//! Here we can get our search query through `url.searchParams.get("q")`
	const contacts = await getContacts(q);
	console.log(contacts,q)
	return { contacts,q }
}
```
* * Now we have to extract that `q` on `src/routes/root.jsx` and use it in `<input/>` tag inside `<Form/>` and set default value to `q`, `defaultValue={q}` there defaultValue is special attribute of `<input/>` tag for React Router DOM	
```
	const { contacts,q } = useLoaderData()
	return (
		<>//existing code
					<Form
						id='search-form'
						role='search'
					>
						<input
							id='q'
							aria-label='Search contacts'
							placeholder='Search'
							type='search'
							name='query'
							defaultValue={q}
						/>
						//existing code	
```
** This create another Problem which the search value is not clearing even if we refresh or reload or select another contact. To solve the page for this we need to use `useEffect()` hook at `src/routes/root.jsx`
```
	//existing code
	
	const { contacts,q } = useLoaderData()
	useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
	
	//existing code
```
*/

// ! Submitting Form onChage (Using `useSubmit()` hook from React Router DOM)
/**
 ** Now we have to import `useSubmit()` hook from React Router DOM at `src/routes/root.jsx`
 ** Then we will store `useSubmit()` hook in a variable called `submit` and use it in `src/routes/root.jsx` to that `<Form/>` tag
```	
	const navigation = useNavigation()
	const submit = useSubmit()
	return (
		<Form
			id='search-form'
			role='search'
		>
			<input
				id='q'
				aria-label='Search contacts'
				placeholder='Search'
				type='search'
				name='query'
				defaultValue={q}
				onChange={(event) => {
					submit(event.currentTarget.form)
				}}
			/>
			<div id='search-spinner' aria-hidden hidden={true} />
	)
```
*/

// !Adding a Spinner
/**
** We can check user searching or not from browser's address bar by `navigation.location` this navigation is provided by React Router DOM
** Now we have to import `useNavigation()` hook from React Router DOM at `src/routes/root.jsx`
** Then we will store `useNavigation()` hook in a variable called `navigation` and use it in `src/routes/root.jsx` to that `<Form/>` tag
```	
	const navigation = useNavigation()
	const searching = navigation.location && new URLSearchParams(navigation.location.search).has('query')	
return (
		 <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              // existing code
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            {// existing code }
          </Form>
          {// existing code }
        </div>
        {// existing code }
      </div>
      {// existing code }
    </>
	)
*/

//!Managing History Stack
/**
 *! Now we can see every time we are typing into search bar it will add a new entry in the history stack
 **To solve this problem we need to use `submit` (`const submit = useSubmit()`) second parameter `replace: true` at `submit(event.currentTarget.form, { replace: true })`
 ** Before this we need check if this is starting of search or not by
 ** `const isFirstSearch = searchParams.get("query") === null` or `const isFirstSearch = !searchParams.has("query")` or `const isFirstSearch = !q` or `const isFirstSearch = q===null`
 ** Now we will add `replace: true` at `submit(event.currentTarget.form, { replace: true })`
 */
//!Mutations Without Navigation (using `useFetcher()` hook)

/**
 ** Already all we updated, updated through url action but for the Favorites we can't use url action, so we need to use `useFetcher()` hook from React Router DOM at `src/routes/contact.jsx`
 ** Then we will store `useFetcher()` hook in a variable called `fetcher` and use it in `src/routes/contact.jsx` to that `<Form/>` tag
	
```
export function Favorite() {
const fetcher = useFetcher()
//existing code
return (
	<fetcher.Form method='post'>
         //existing code
	</fetcher.Form>
)}
 ** Now we need to make a action at `src/actions/actions.js` 
```export async function setFavoriteAction({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
} 
 ** Now we need to import `setFavoriteAction` from `src/actions/actions.js` at `src/main.jsx` and set it as a 'action' key value pair `action:setFavoriteAction,`
```
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
       //existing code 
    ],
  },
]);
```
 */

//!Optimistic UI update(using `useFetcher()` hook)

/**
 ** To give the user some feedback, we could put the star into a loading state with fetcher.state (a lot like navigation.state from before), but we can do something even better this time.
 ** We can use a strategy called "optimistic UI"
 ** Now we need to import `useFetcher()` hook from React Router DOM at `src/routes/contact.jsx` 
 ** Then we will store `useFetcher()` hook in a variable called `fetcher` and use it in `src/routes/contact.jsx` to that `<Form/>` tag
**
```jsx
const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;
``` 
 */

//! Not Found Data

/**
 *! What happens if we navigate to a Contact that doesn't exist by changing the URL?
 *! To handle this, we can use the `errorElement` prop on the root route to render a custom error page.
 ** We can make check for this Error at the getContactLoader function at `src/loaders/contactsLoaders.js`
 ** Now we will update our `getContactLoader` function at `src/loaders/contactsLoaders.js` 
```jsx
export async function getContactLoader({ params }) {
	const contact = await getContact(params.contactId)
	if (!contact) {
		throw new Response("", {//
			status: 404,
			statusText: "Not Found",
		})
	}
	console.log(contact)
	return { contact }
}
```
 */
//! Pathless routing
/**
 *! Here we can see we are using one <ErrorPage/> for all the routes
 ** But we write all <ErrorPage/> in one place is not a good idea, abut we can do it,
 ** so we can use `pathless` routing by removing all the errorElement from all the routes for children routes like:
```
	//From:
	const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: getContactsLoader,
		action: createContactAction,
		children: [
			{ index: true, element: <Index /> },
			{
				path: "/contacts/:contactId",
				element: <Contact />,
				errorElement: <ErrorPage />,
				loader: getContactLoader,
				action: setFavoriteAction,
			},
			{
				path: "/contacts/:contactId/edit",
				element: <EditContact />,
				errorElement: <ErrorPage />,
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

createRoot(document.getElementById("root")).render(
	<StrictMode>
		{/* <App /> */}
		{/* Here we will replace <App/> with  */}
		<RouterProvider router={router} />
		{/* Here, router atrribute will recive the path and element cotained object and set which componenet or element to render which path */}
	</StrictMode>
)
