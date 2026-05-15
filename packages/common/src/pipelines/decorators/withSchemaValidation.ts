import Zod from "zod";

import { UnsupportedError, ValidationError } from "../../errors";
import { ZodSchemaValidator } from "../../validators";

import { PipelineContext, PreHook, PipelineDirective } from "../types";

import { ValidationExpressionResult } from "./types";

/**
 * Universal functional pre-hook decorator enforcing strict Zod data schema assertions.
 *
 * Inspects incoming request payloads at the pipeline threshold, supporting custom predicate overrides
 * to handle short-circuits or throwing structured validation exceptions on parsing failures.
 */
const withSchemaValidation = <Context extends PipelineContext, Payload>(
    validator: ZodSchemaValidator<Payload>,
	payloadToValidate: any,
    exceptionalPredicate?: (result: Zod.ZodSafeParseResult<Payload>) => ValidationExpressionResult
): PreHook<Context> => {
    return async (context: Context): Promise<PipelineDirective<Context>> => {
        const parseResult: Zod.ZodSafeParseResult<Payload> = validator.apply(payloadToValidate);

        if(exceptionalPredicate) {
            const outcome = exceptionalPredicate(parseResult);

			switch(outcome.action) {
			case "SHORT_CIRCUIT":
				return {
					action: "SHORT_CIRCUIT",
					response: outcome.response
				};
			case "NO_OP":
				// Do nothing and break out of the switch statement to let standard evaluation continue
				break;
			default:
				throw new UnsupportedError(
					"Unsupported operational execution action encountered.",
					"The evaluation predicate returned an unmapped or unhandled action signature token."
				);
			}
        }

        if(!parseResult.success) {
            const structuredErrors = parseResult.error.issues.map((issue) => ({
                attribute: issue.path.join("."),
                errors: [issue.message]
            }));

            throw ValidationError.Builder()
                .withMessage("Inbound data schema assertion constraints violated.")
                .withDetail("The request payload contains malformed attributes or missing required fields.")
                .withErrors(structuredErrors)
                .build();
        }

        return {
            action: "CONTINUE",
            context: {
                ...context,
                validatedData: parseResult.data
            }
        };
    };
};

export default withSchemaValidation;
