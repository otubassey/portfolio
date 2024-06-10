import { Dispatch, ForwardedRef, MutableRefObject, forwardRef, useCallback } from "react";
import PropTypes from "prop-types";

import { ICON_NAMES, IconButton } from "../icon";
import { withDisplayName } from "@/ui/decorator";
import { PaginationActions, PaginationDispatcherAction, PaginationPage } from "@/ui/hooks";

type Props = {
    onPageChange: Dispatch<PaginationDispatcherAction>;
    page: PaginationPage;
    pageItemRef?: MutableRefObject<HTMLDivElement[]>;
};

CarouselController.propTypes = {
    onPageChange: PropTypes.func,
    page: PropTypes.shape({
        count: PropTypes.number,
        current: PropTypes.number
    }),
    pageItemRef: PropTypes.shape({
        current: PropTypes.array
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

export default forwardRef<HTMLDivElement, Props>(withDisplayName<Props>()(CarouselController));
