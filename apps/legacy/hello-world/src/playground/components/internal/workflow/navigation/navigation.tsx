import { memo, useCallback } from "react";

import { displayName } from "@/hwiui/decorator";
import { Collapse } from "@/hwiui/widgets/collapse";
import { ValuesOf } from "@/hwiui/widgets/common";
import { ExpandIcon, IconName } from "@/hwiui/widgets/icon";
import { List, ListItem, ListItemButton } from "@/hwiui/widgets/list";

import ComponentsByCategory, { ComponentCategory } from "./componentsByCategory";
import { ImmutablePlaygroundAttributes } from "../../../common";

type Props = {
    category: ValuesOf<typeof ComponentCategory> | null;
    componentNode: ImmutablePlaygroundAttributes | null;
    onCategoryChange: (val: ValuesOf<typeof ComponentCategory> | null) => void;
    onComponentClick: (val: ImmutablePlaygroundAttributes) => void;
};

const Navigation = ({
    category,
    componentNode,
    onCategoryChange,
    onComponentClick
}: Props) => {
    const handleCategoryClickFactory = useCallback((selectedCategory: ValuesOf<typeof ComponentCategory>) => () => {
        onCategoryChange?.(category !== selectedCategory ? selectedCategory : null);
    }, [category, onCategoryChange]);
    return (
        <nav className="p-1 max-h-[44rem] overflow-y-auto">
            <List>
                {
                    Object.values(ComponentCategory).map(componentCategory => (
                        <ListItem>
                            <ListItemButton
                                key={componentCategory}
                                component="div"
                                onClick={handleCategoryClickFactory(componentCategory)}
                                selected={componentCategory === category}>
                                <ExpandIcon
                                    collapseIcon={IconName.KEYBOARD_ARROW_RIGHT}
                                    expandIcon={IconName.KEYBOARD_ARROW_DOWN}
                                    isExpanded={componentCategory === category}
                                />
                                {componentCategory}
                            </ListItemButton>
                            {
                                category === componentCategory &&
                                <Collapse component="ul" className="max-h-[26rem] overflow-y-auto" show>
                                    {
                                        ComponentsByCategory.get(componentCategory)?.map((component: ImmutablePlaygroundAttributes) => (
                                            <ListItemButton
                                                key={component.get("id")}
                                                indent
                                                onClick={() => onComponentClick?.(component)}
                                                selected={component === componentNode}>
                                                {component.get("displayName")}
                                            </ListItemButton>
                                        ))
                                    }
                                </Collapse>
                            }
                        </ListItem>
                    ))
                }
            </List>
        </nav>
    );
};

export default memo(displayName()(Navigation));
