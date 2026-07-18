import Zod from "zod";

import { Validator } from "../validators";

export type SchemaValidatorFactory<Keys extends string> = (zodSchema: Zod.ZodObject<any>, key: Keys) => Validator<string>;
