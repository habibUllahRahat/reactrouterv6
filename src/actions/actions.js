import { redirect } from "react-router-dom"
import {
	createContact,
	deleteContact,
	updateContact,
} from "../contacts"

// every function get two parameters request and params
export async function createContactAction() {
	const contact = await createContact()
	console.log("createContactAction")
	return { contact }
}

export async function updateContactAction({
	request,
	params,
}) {
	const formData = await request.formData()
	const updates = Object.fromEntries(formData)
	await updateContact(params.contactId, updates)
	return redirect(`/contacts/${params.contactId}`)
}

export async function deleteContactAction({ params }) {
	// throw Error("Try again later")
	await deleteContact(params.contactId)
	return redirect("/")
}
export async function setFavoriteAction({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}
