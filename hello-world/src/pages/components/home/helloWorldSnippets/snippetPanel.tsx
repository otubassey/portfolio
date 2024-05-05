"use client";

import { memo, useState } from "react";

import { withDisplayName } from "@/pages/ui/decorator";
import {Tab, Tabs} from "@/pages/ui/widgets/tabs";

import { Snippet } from "./helloWorldSnippets.types";

const CLASSNAMES = {
    fileName: "mt-2 flex-none text-sky-300 border-t border-b border-t-transparent border-b-sky-300 px-4 py-1 flex items-center",
    root: "rounded-md border border-neutral-500",
    language: "block text-slate-300 text-center p-1",
    tab: {
        root: "p-3",
        snippet: "text-xs text-wrap lg:text-sm"
    }
} as const;

const isActiveTabOrPanel = (selectedTabIndex: number, tabIndex: number): boolean => selectedTabIndex === tabIndex;

function SnippetPanel({language = null, tabs = null}: Snippet) {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <div className={CLASSNAMES.root}>
            <span className={CLASSNAMES.language}>{language ?? "Unknown Language"}</span>
            <Tabs>
                {
                    tabs?.map((tab, index) => (
                        <Tab
                            key={tab.filename}
                            active={isActiveTabOrPanel(selectedTab, index)}
                            onChange={(_, value) => setSelectedTab(value)}
                            label={tab.filename}
                            value={index}
                        />
                    ))
                }
            </Tabs>
            <div>
                {
                    tabs?.map((tab, index) => (
                        isActiveTabOrPanel(selectedTab, index) &&
                        <div className={CLASSNAMES.tab.root} key={tab.filename}>
                            <pre className={CLASSNAMES.tab.snippet}>{tab.snippet}</pre>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default memo(withDisplayName<Snippet>()(SnippetPanel));
