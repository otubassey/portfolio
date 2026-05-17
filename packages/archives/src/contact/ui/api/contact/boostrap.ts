import { ZodSchemaValidator } from "@otuekong-portfolio/common";

import { ContactFormSchema } from "../../../core";

import ContactHttpClient from "./contactHttpClient";
import ContactService from "./contactService";

const contactHttpClientInstance = new ContactHttpClient();

export const ConfiguredContactService = new ContactService(
	new ZodSchemaValidator(ContactFormSchema),
	contactHttpClientInstance
);
