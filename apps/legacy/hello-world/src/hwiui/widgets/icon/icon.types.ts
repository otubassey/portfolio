import { SVGProps } from "react";

export type SVGIconProps = SVGProps<SVGElement> & {
    description?: string;
    title?: string;
};
