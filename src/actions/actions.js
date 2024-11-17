import { createContact } from "../contacts"

export async function createContactAction() {
	const contact = await createContact()
	console.log("createContactAction")
	return { contact }
}
