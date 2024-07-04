import { Dispatch, ForwardedRef, MutableRefObject, forwardRef, useCallback } from "react";
import PropTypes from "prop-types";

import { ICON_NAMES, IconButton } from "../icon";
import { withDisplayName } from "@/ui/decorator";
import { PaginationActions, PaginationDispatcherAction, PaginationPage } from "@/ui/hooks";

export type Props = {
    containerProps?: {
        ref: MutableRefObject<HTMLDivElement>;
        itemClassName: string;
    };
    onPageChange: Dispatch<PaginationDispatcherAction>;
    page: PaginationPage;
};

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

function CarouselController({onPageChange}: Props, ref: ForwardedRef<HTMLDivElement>) {
    const handlePreviousClick = useCallback(() => {
        onPageChange?.({type: PaginationActions.PREVIOUS});
    }, [onPageChange]);
    const handleNextClick = useCallback(() => {
        onPageChange?.({type: PaginationActions.NEXT});
    }, [onPageChange]);
    return (
        <div ref={ref} className="inline-flex justify-center">
            <IconButton icon={ICON_NAMES.ARROW_BACK_IOS} onClick={handlePreviousClick} />
            <IconButton icon={ICON_NAMES.ARROW_FORWARD_IOS} onClick={handleNextClick} />
        </div>
    );
}

export default forwardRef<HTMLDivElement, Props>(withDisplayName()(CarouselController));
