import { Dispatch, ForwardedRef, MutableRefObject, forwardRef, useCallback } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { PaginationActions, PaginationDispatcherAction, PaginationPage } from "@/hwiui/hooks";

import { IconButton } from "../button";
import { IconName } from "../icon";

export type Props = {
    containerProps?: {
        ref: MutableRefObject<HTMLDivElement>;
        itemClassName: string;
    };
    onPageChange: Dispatch<PaginationDispatcherAction>;
    page: PaginationPage;
};

const CarouselController = forwardRef<HTMLDivElement, Props>(({
    onPageChange
}: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const handlePreviousClick = useCallback(() => {
        onPageChange?.({type: PaginationActions.PREVIOUS});
    }, [onPageChange]);
    const handleNextClick = useCallback(() => {
        onPageChange?.({type: PaginationActions.NEXT});
    }, [onPageChange]);
    return (
        <div ref={ref} className="inline-flex justify-center">
            <IconButton icon={IconName.ARROW_BACK_IOS} onClick={handlePreviousClick} />
            <IconButton icon={IconName.ARROW_FORWARD_IOS} onClick={handleNextClick} />
        </div>
    );
});

CarouselController.displayName = getDisplayName(CarouselController);

CarouselController.propTypes = {
    containerProps: PropTypes.shape({
        ref: PropTypes.shape({
            current: PropTypes.node
        }),
        itemClassName: PropTypes.string
    }),
    onPageChange: PropTypes.func,
    page: PropTypes.shape({
        count: PropTypes.number,
        current: PropTypes.number
    })
};

export default CarouselController;
