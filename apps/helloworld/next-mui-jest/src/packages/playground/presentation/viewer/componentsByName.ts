import { ComponentType } from "react";
import { HwiuiIcon } from "@/packages/hwiui";

const ComponentsByName: {[key: string]: ComponentType<any>} = {
    HwiuiIcon
} as const;

export default ComponentsByName;