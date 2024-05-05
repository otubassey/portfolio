import { ForwardedRef, memo, forwardRef, FC } from "react";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

function SadFaceEmoji({description, svg, title, ...otherProps}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): FC<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "sadFaceEmojiDescription", value: "An Sad Face Emoji Icon", ...description}}
            svg={svg}
            title={{id: "sadFaceEmojiTitle", value: "SadFaceEmoji", ...title}}
            {...otherProps}>
            <circle cx="15.5" cy="9.5" r="1.5" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path
                strokeWidth={0.1}
                fill="#fff"
                d="M12 14c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5zm-.01-12C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            />
        </SVGBase>

    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName<SVGIconProps>()(SadFaceEmoji)));
