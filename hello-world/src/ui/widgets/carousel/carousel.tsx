import { ForwardedRef, forwardRef, ReactNode } from "react";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "../../utils";

const CLASSNAMES = {
    root: "relative w-full h-96 flex flex-col",
    contentRoot: "w-full inline-block flex-none"
} as const;

export type CarouselProps = {
    children: ReactNode;
    className?: string;
    controller?: ReactNode;
};

function Carousel({
    children = null,
    className,
    controller,
    ...otherProps
}: CarouselProps, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <div ref={ref} className={ClassesUtil.concat(className, CLASSNAMES.root)} {...otherProps}>
            {controller}
            <div className={CLASSNAMES.contentRoot}>{children}</div>
        </div>
    );
}

export default forwardRef<HTMLDivElement, CarouselProps>(withDisplayName<CarouselProps>()(Carousel));
