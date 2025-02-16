import { ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import {Paper, PaperProps} from "@/hwiui/widgets/paper";
import { ClassesUtils } from "@/hwiutils";

import { ValuesOf } from "../common";
import { Typography, TypographyProps } from "../typography";

const CLASSNAMES = {
    title: {
        sticky: "sticky top-0 z-20 mb-4 py-5 backdrop-blur md:relative md:top-auto md:mx-auto md:w-full md:px-0 md:py-0 md:opacity-0"
    }
} as const;

export const SectionHeightSize = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
    FALSE: false
} as const;

const ContentHeightinRemByHeightSize: {[key: keyof Omit<typeof SectionHeightSize, "FALSE"> | string]: string} = {
    [SectionHeightSize.SMALL]: "max-h-[30rem]",
    [SectionHeightSize.MEDIUM]: "max-h-[35rem]",
    [SectionHeightSize.LARGE]: "max-h-[40rem]"
} as const;

export const SectionScroll = {
    ALL: "all",
    CONTENT: "content"
} as const;

function mapContentMaxHeight(
    scrollProp?: ValuesOf<typeof SectionScroll>,
    maxHeight?: ValuesOf<typeof SectionHeightSize> | string
): string {
    if(!scrollProp || scrollProp === SectionScroll.ALL) {
        return "";
    }
    if(!maxHeight) {
        return ContentHeightinRemByHeightSize[SectionHeightSize.SMALL];
    }
    const matchedValue = ContentHeightinRemByHeightSize[maxHeight];
    if(matchedValue) {
        return matchedValue;
    }
    return maxHeight;
}

type ClassesProps = {
    root?: string;
    title?: string;
};

type Props = {
    classes?: ClassesProps;
    children?: ReactNode;
    hasStickyHeader?: boolean;
    maxHeight?: ValuesOf<typeof SectionHeightSize> | string;
    paperProps?: PaperProps;
    scroll?: ValuesOf<typeof SectionScroll>;
    title?: string;
    typographyProps?: TypographyProps;
};

const Section = forwardRef<HTMLElement, Props>(({
    children,
    classes,
    hasStickyHeader = false,
    maxHeight,
    paperProps,
    scroll: scrollProp,
    title,
    typographyProps
}: Props, ref: ForwardedRef<HTMLElement>) => {
    const contentMaxHeight = mapContentMaxHeight(scrollProp, maxHeight);
    return (
        <Paper
            {...paperProps}
            ref={ref}
            className={ClassesUtils.merge(classes?.root)}
            component="section">
           {
                title &&
                <Typography
                    aria-label={title}
                    variant="h6"
                    {...typographyProps}
                    className={ClassesUtils.merge(
                        classes?.title,
                        "py-4 px-6",
                        // [hasStickyHeader && CLASSNAMES.title.sticky]
                        [hasStickyHeader && "sticky"] // TODO: fix sticky. Lokk at https://mui.com/material-ui/react-list/#sticky-subheader
                    )}>
                    {title}
                </Typography>
            }
            <div className={ClassesUtils.merge(
                "py-4 px-6 overflow-y-auto",
                contentMaxHeight
            )}>
                {children}
            </div>
        </Paper>
    );
});

Section.displayName = getDisplayName(Section);

Section.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.shape({
        root: PropTypes.string,
        title: PropTypes.string
    }),
    hasStickyHeader: PropTypes.bool,
    paperProps: PropTypes.object,
    title: PropTypes.string,
    typographyProps: PropTypes.object
};

export default Section;
