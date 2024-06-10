import { ReactNode } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";

type Props = {
    children: ReactNode;
    className?: string;
};

DialogActions.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

function DialogActions({children, className}: Props) {
    return (
        <div className={ClassesUtil.concat("flex items-center justify-end w-full mt-6 gap-5", className)}>{children}</div>
    );
}

export default withDisplayName()(DialogActions);