import { emailSchemaFactory, EmailZodSchema } from "../schemas";

import Validator from "./validator";
import ZodSchemaValidator from "./zodSchemaValidator";

type EmailValidatorOptions = {
	message?: string;
};

/**
 * Generates a decoupled Email Validator instance on demand.
 */
export const createEmailValidator = (options?: EmailValidatorOptions): Validator<string> => (
	new ZodSchemaValidator(
		options?.message ? emailSchemaFactory(options.message): EmailZodSchema
	)
);
