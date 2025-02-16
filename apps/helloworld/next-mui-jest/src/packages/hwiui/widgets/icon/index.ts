import * as Icons from "./icons";

export const HwiuiIconName = Object.keys(Icons);

export {default as HwiuiIcon} from "./hwiuiIcon";
export {default as OtuRectangularIcon} from "./otuRectangularIcon";
export {default as OtuRoundedIcon} from "./otuRoundedIcon";

type HwiuiIconNameValues = keyof typeof Icons;

export type {HwiuiIconNameValues};
