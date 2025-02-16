import { ReactNode } from "react";

import { displayName } from "@/packages/hwiui";

type PresentationContainerProps = {
    children?: ReactNode;
};

const PresentationContainer = ({
    children
}: PresentationContainerProps) => {
    return (children);
};

export default displayName()(PresentationContainer);
