import { PresentationAttributes } from "@/app/playground/dashboard/types";
import { ToggleButton } from "@/packages/hwiui";

import ToggleButtonNode from "./toggleButtonNode";
import ToggleButtonPresenter from "./toggleButtonPresenter";

export const ToggleButtonPresentation: PresentationAttributes = {
    node: ToggleButtonNode,
    presenter: ToggleButtonPresenter,
    component: ToggleButton,
    title: "Toggle Button"
} as const;
