import { getContacts } from "../contacts"

export async function getContactsLoader() {
	const contacts = await getContacts()
	console.log(contacts)
	return { contacts }
}
