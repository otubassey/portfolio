import { ComponentType, MemoExoticComponent } from "react";

import Button from "./button";
import { Choice } from "./choice";
import { ChoiceGroup } from "./choiceGroup";
import Fragment from "./fragment";
import HwiuiIcon from "./hwiuiIcon";
import Select from "./select";
import Switch from "./switch";
import Text from "./text";

const PropInputsByName: {[key: string]: ComponentType<unknown> | MemoExoticComponent<ComponentType<any>>} = {
    Button,
    Choice,
    ChoiceGroup,
    Fragment,
    HwiuiIcon,
    Select,
    Switch,
    Text
} as const;

export default PropInputsByName;
