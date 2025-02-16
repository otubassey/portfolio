import { ReactNode, forwardRef, useEffect } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { useToggle } from "@/hwiui/hooks";
import { Collapse } from "@/hwiui/widgets/collapse";
import { ExpandIcon } from "@/hwiui/widgets/icon";
import { Paper } from "@/hwiui/widgets/paper";
import { Title } from "@/hwiui/widgets/title";
import { ClassesUtils } from "@/hwiutils";

type Classes = {
    root?: string;
    collapse?: string;
};

type Props = {
    children?: ReactNode;
    classes?: Classes;
    expand?: boolean;
    fullWidth?: boolean;
    header?: ReactNode;
    title?: string;
};

const ExpansionPanel = forwardRef(({
    children,
    classes = null,
    expand = false,
    fullWidth = false,
    header = null,
    title
}: Props) => {
    const [isExpanded, toggleIsExpanded] = useToggle(false);
    useEffect(() => {
        toggleIsExpanded(expand);
    }, [expand]);
    const hasTitle = Boolean(title);
    return (
        <Paper className={classes?.root}>
            {
                hasTitle &&
                <div
                    className={ClassesUtils.concat("inline-flex justify-between items-center pl-4 cursor-pointer", {["w-full"]: fullWidth})}
                    onClick={toggleIsExpanded}>
                    <Title>{title}</Title>
                    <ExpandIcon isExpanded={isExpanded} />
                </div>
            }
            {
                !hasTitle && header
            }
            <Collapse className={ClassesUtils.concat("pl-4", classes?.collapse)} show={isExpanded}>
                {children}
            </Collapse>
        </Paper>
    );
});

ExpansionPanel.displayName = getDisplayName(ExpansionPanel);

ExpansionPanel.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.shape({
        root: PropTypes.string,
        collapse: PropTypes.string
    }),
    fullWidth: PropTypes.bool,
    header: PropTypes.node,
    title: PropTypes.string
};

export default ExpansionPanel;
