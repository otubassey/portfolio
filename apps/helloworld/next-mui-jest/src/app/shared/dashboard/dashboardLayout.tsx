import { ReactNode } from "react";

import LayoutPageProvider from "../context/layoutPageProvider";
import Dashboard from "./dashboard";
import { displayName } from "@/packages/hwiui";

type DashboardLayoutAttributes = {
    children?: ReactNode;
};

const DashboardLayout = ({
    children
}: DashboardLayoutAttributes) => {
    return (
        <LayoutPageProvider>
            <Dashboard>
                {children}
            </Dashboard>
        </LayoutPageProvider>
    );
};

export default displayName()(DashboardLayout);
