import { memo, useEffect, useState } from "react";

import { displayName } from "@/hwiui/decorator";
import useTheme from "@/hwiui/theme/useTheme";
import { ValuesOf } from "@/hwiui/widgets/common";
import { Section } from "@/hwiui/widgets/section";
import { Typography } from "@/hwiui/widgets/typography";

import { ImmutablePlaygroundAttributes } from "./components/common";
import {Dashboard, Navigation, Settings} from "./components/internal";
import { ComponentCategory } from "./components/internal/workflow/navigation/componentsByCategory";

function Main() {
    const {theme, onChange, onReset} = useTheme();
    const [selectedCategory, setSelectedCategory] = useState<ValuesOf<typeof ComponentCategory> | null>(null);
    const [selectedComponentNode, setSelectedComponentNode] = useState<ImmutablePlaygroundAttributes | null>(null);
    useEffect(() => {
        setSelectedComponentNode(null);
    }, [selectedCategory]);
    return (
        <div className="grid grid-cols-4 gap-2 border border-red-600">
            <header className="col-span-4 border border-slate-700">
                <Section title="Settings">
                    {
                        !theme &&
                        <Typography>Set theme</Typography>
                    }
                    {
                        Boolean(theme) &&
                        <Settings theme={theme!} onThemeChange={onChange} onResetTheme={onReset} />
                    }
                </Section>
            </header>
            <Navigation
                category={selectedCategory}
                componentNode={selectedComponentNode}
                onCategoryChange={setSelectedCategory}
                onComponentClick={setSelectedComponentNode}
            />
            <Dashboard node={selectedComponentNode} />
        </div>
    );
}

export default memo(displayName()(Main));
