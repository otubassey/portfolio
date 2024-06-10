import { ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";

type Props = {
    children: ReactNode;
    className?: string;
    open: boolean;
};

Dialog.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    open: PropTypes.bool
}

function Dialog({
    children,
    className,
    open = false
}: Props, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <div ref={ref} className={ClassesUtil.concat("min-h-dvh min-w-[36rem] bg-transparent transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 h-screen", {["hidden"]: !open}, className)}>
            <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg content-center h-screen">
                <div className="relative flex flex-col gap-5 py-4 px-4 md:px-4 bg-paper shadow-md rounded border border-gray-400">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default forwardRef<HTMLDivElement, Props>(withDisplayName()(Dialog));
