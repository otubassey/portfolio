import { z as Zod } from "zod";

export const ContactFormSchema = Zod.object({
	name: Zod.string()
		.trim()
		.min(2, "Name must be at least 2 characters")
		.max(100, { message: "Name must be under 50 characters" }),
	email: Zod.string()
		.trim()
		.pipe(
			Zod.email("Please enter a valid email address")
		),
	message: Zod.string()
		.trim()
		.min(10, "Message must be at least 10 characters")
		.max(1000, "Message must be at most 1000 characters"),

	// The Honeypot Field
	zipCode: Zod.string()
		.max(0)
		.optional()
		.default("")
});

export type ContactFormSchemaType = Zod.infer<typeof ContactFormSchema>;
