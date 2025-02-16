import {List as ImmutableList, Map as ImmutableMap} from "immutable";

import { ValuesOf } from "@/hwiui/widgets/common";
import {
    ButtonBase,
    Button,
    Card,
    IconButton,
    Icon,
    List,
    ListItem,
    ListItemBase,
    ListItemButton,
    ListItemText,
    Modal,
    Paper,
    Section,
    Switch,
    Tab,
    Tabs,
    Typography
} from "../../../external";

import { ImmutablePlaygroundAttributes } from "../../../common";

export const ComponentCategory = {
    WORKFLOW_COMPONENTS: "App Workflows",
    SCENARIO_BASED_COMPONENTS: "Scenarios", // like nested sections to make sure headers are in decending order
    UI_COMPONENTS: "UI Components"
} as const;

const ComponentsByCategory = ImmutableMap<ValuesOf<typeof ComponentCategory>, ImmutableList<ImmutablePlaygroundAttributes>>({
    [ComponentCategory.WORKFLOW_COMPONENTS]: ImmutableList<ImmutablePlaygroundAttributes>(),
    [ComponentCategory.SCENARIO_BASED_COMPONENTS]: ImmutableList<ImmutablePlaygroundAttributes>(),
    [ComponentCategory.UI_COMPONENTS]: ImmutableList<ImmutablePlaygroundAttributes>([
        ButtonBase,
        Button,
        Card,
        Icon,
        IconButton,
        List,
        ListItem,
        ListItemBase,
        ListItemButton,
        ListItemText,
        Modal,
        Paper,
        Section,
        Switch,
        Tab,
        Tabs,
        Typography
    ])
});

export default ComponentsByCategory;
