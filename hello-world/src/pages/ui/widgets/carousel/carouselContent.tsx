import { ForwardedRef, forwardRef, MouseEventHandler, ReactNode } from "react";
import { withDisplayName } from "@/pages/ui/decorator";

const CLASSNAMES = {
    display: {
        hide: "hidden",
        show: "block",
        tint: "opacity-30"
    }
} as const;

export type CarouselContentProps = {
    children: ReactNode | null,
    display?: "hide" | "show" | "tint", //remove??
    onMouseEnter?: MouseEventHandler<HTMLDivElement>,
    onMouseLeave?: MouseEventHandler<HTMLDivElement>
};

function CarouselContent({
    children = null,
    display = "show",
    onMouseEnter,
    onMouseLeave,
    ...otherProps
}: CarouselContentProps, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <div
            ref={ref}
            className={CLASSNAMES.display[display ?? "show"]}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...otherProps}>
            {children}
        </div>
    );
}

export default forwardRef<HTMLDivElement, CarouselContentProps>(withDisplayName<CarouselContentProps>()(CarouselContent));
