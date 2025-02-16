"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

import { PresentationTitle, PresentationTitleValues } from "@/app/playground";
import { displayName } from "@/packages/hwiui";

type LayoutPageProps = {
    activeNavigationItem?: PresentationTitleValues;
    onNavigationItemChange?: Dispatch<SetStateAction<PresentationTitleValues>>
};

const LayoutPageContext = createContext<LayoutPageProps>({});

export function useLayoutPage(): LayoutPageProps {
    return useContext(LayoutPageContext);
}

type LayoutPageProviderProps = {
    children?: ReactNode;
};

const LayoutPageProvider = ({
    children
}: LayoutPageProviderProps) => {
    const [activeNavigationItem, setActiveNavigationItem] = useState<PresentationTitleValues>(PresentationTitle.OVERVIEW);
    return (
        <LayoutPageContext.Provider
            value={{
                activeNavigationItem,
                onNavigationItemChange: setActiveNavigationItem
            }}>
            {children}
        </LayoutPageContext.Provider>
    );
};

export default displayName()(LayoutPageProvider);
