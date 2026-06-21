import Zod from "zod";

class ZodSchemaTransformer {
	transform(jsonSchema: any): Zod.ZodObject<any> {
		const shape: Record<string, Zod.ZodTypeAny> = {};
    	const requiredFields = new Set(jsonSchema.required || []);

		for(const [key, prop] of Object.entries<any>(jsonSchema.properties)) {
			let zodField: Zod.ZodTypeAny = Zod.string().trim();

			// Convert format strings to specific Zod validators
			if(prop.format === "uri") {
				zodField = (zodField as Zod.ZodString).url();
			} else if (prop.enum) {
				zodField = Zod.enum(prop.enum as [string, ...string[]]);
			}

			// Handle fallback values
			if(prop.default !== undefined) {
				zodField = zodField.default(prop.default);
			}

			// Handle optional vs required parameters
			if(!requiredFields.has(key) && prop.default === undefined) {
				zodField = zodField.optional();
			}

			shape[key] = zodField;
		}

		return Zod.object(shape);
	}
}

export default ZodSchemaTransformer;
