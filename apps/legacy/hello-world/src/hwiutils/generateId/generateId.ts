import { v4 as uuidV4, parse, stringify } from "uuid";

const generateId = (): string => stringify(parse(uuidV4()));

export default generateId;
