import { SVGAttributes } from "react";
import { ICON_NAMES } from "./icon.constants";

export type IconProps = {
    name?: string;
};

export type SVGIconProps = {
    description?: {
        id?: string | null;
        value: string | null;
    };
    svg?: SVGAttributes<SVGSVGElement>;
    title?: {
        id?: string | null;
        value: string | null;
    };
} & IconProps;

export type IconName = typeof ICON_NAMES[keyof typeof ICON_NAMES];
