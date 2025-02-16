import { ComponentType } from "react";

import {
    Choice,
    ChoiceItem,
    ChoiceItemText,
    FormControlLabel,
    Input,
    List,
    ListItem,
    Select,
    Switch
} from "./node";

const PlaygroundComponentsByElement: {[key: string]: ComponentType<any>} = {
    Choice,
    ChoiceItem,
    ChoiceItemText,
    FormControlLabel,
    Input,
    List,
    ListItem,
    Select,
    Switch
};

export default PlaygroundComponentsByElement;
