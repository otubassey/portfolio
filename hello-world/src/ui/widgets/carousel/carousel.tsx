import { Children, cloneElement, ForwardedRef, forwardRef, MutableRefObject, ReactElement, ReactNode } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { usePagination, useRefs } from "@/ui/hooks";
import { ClassesUtil } from "@/ui/utils/";

import CarouselController from "./carouselController";

const CLASSNAMES = {
    root: "relative w-full grid",
    contentRoot: "w-full gap-4 overflow-hidden"
} as const;

const CarouselOrientation = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
} as const;

type Orientation = typeof CarouselOrientation[keyof typeof CarouselOrientation];

export type Props = {
    children: ReactNode;
    className?: string;
    controller?: ReactNode;
    itemsPerPage?: number;
    orientation?: Orientation;
};

Carousel.protoTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    controller: PropTypes.node,
    itemsPerPage: PropTypes.number,
    orientation: PropTypes.oneOf(Object.values(CarouselOrientation))
};

function Carousel({
    children = null,
    className,
    controller,
    itemsPerPage: itemsPerPageProp,
    orientation,
    ...otherProps
}: Props, ref: ForwardedRef<HTMLDivElement>) {
    const [carouselContentListRefs, setCarouselContentListRefs] = useRefs<HTMLDivElement>();
    const displayOrientation = orientation ?? CarouselOrientation.HORIZONTAL;
    const itemsCount = children ? Children.count(children) : 0;
    const itemsPerPage = itemsPerPageProp ?? 1;
    const [{startIndex, endIndex, page}, handlePageChange] = usePagination(itemsCount, itemsPerPage);
    const hasProvidedController = Boolean(controller);
    const ClonedController = hasProvidedController
        ? cloneElement(controller as ReactElement<any>, {onPageChange: handlePageChange, page, pageItemRef: carouselContentListRefs})
        : controller;
    return (
        <div
            ref={ref}
            className={ClassesUtil.concat(
                className,
                CLASSNAMES.root
            )}
            {...otherProps}>
            {
                hasProvidedController
                    ? ClonedController
                    : <CarouselController
                        onPageChange={handlePageChange}
                        page={page}
                        pageItemRef={carouselContentListRefs as MutableRefObject<HTMLDivElement[]>}
                    />
            }
            <div
                className={ClassesUtil.concat(
                    CLASSNAMES.contentRoot,
                    {
                        ["flex flex-row"]: CarouselOrientation.HORIZONTAL === displayOrientation,
                        ["flex flex-col"]: CarouselOrientation.VERTICAL === displayOrientation,
                    }
                )}>
                {Children.toArray(children).slice(startIndex, endIndex).map((child, index) => (
                    <div key={index} ref={setCarouselContentListRefs(index)} className="flex-initial">{child}</div>
                ))}
            </div>
        </div>
    );
}

export default forwardRef<HTMLDivElement, Props>(withDisplayName<Props>()(Carousel));
