import { ValueOf } from "next/dist/shared/lib/constants";
import { SKILL_TYPE } from "./skills.constants";

export type Skill = {type: ValueOf<typeof SKILL_TYPE>, name: string, hasSnippet: boolean};
