import { createElement } from "react";

import { SvgIconProps } from "@mui/material";

import * as HwiuiIcons from "./icons";

type HwiuiIconProps = SvgIconProps & {
    name: keyof typeof HwiuiIcons;
};

const HwiuiIcon = ({
    name,
    ...otherProps
}: HwiuiIconProps) => {
    const Icon = HwiuiIcons[name] ?? HwiuiIcons.sickOutlined;
    return createElement(Icon, {...otherProps});
};

export default HwiuiIcon;
