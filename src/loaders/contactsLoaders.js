import { getContact, getContacts } from "../contacts"

export async function getContactsLoader({ request }) {
	const url = new URL(request.url)
	const q = url.searchParams.get("query")
	const contacts = await getContacts(q)
	console.log(contacts, q)
	return { contacts, q }
}

export async function getContactLoader({ params }) {
	const contact = await getContact(params.contactId)
	if (!contact) {
		throw new Response("", {
			status: 404,
			statusText: "Not Found",
		})
	}
	console.log(contact)
	return { contact }
}
