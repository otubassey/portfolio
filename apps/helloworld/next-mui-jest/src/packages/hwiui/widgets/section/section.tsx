"use client";

import { ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { Paper, PaperProps, styled, TypographyProps } from "@mui/material";

import clsx from "clsx";
import { Header } from "../header";
import { displayName } from "../../decorator";

const SectionRoot = styled(Paper, {
    name: "HwiuiSection",
    slot: "Root",
    overridesResolver: (_, styles) => styles.root,
})(({theme}) => ({
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
}));

const SectionContent = styled("div", {
    name: "HwiuiSectionContent",
    slot: "Content"
})({
    gap: 2,
    overflowY: "auto",
    padding: 0,
    variants: [
        {
            props: { scrollContent: true },
            style: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }
        }
    ]
});

type ClassesProps = {
    root?: string;
    title?: string;
};

type Props = {
    children?: ReactNode;
    className?: string;
    classes?: ClassesProps;
    PaperProps?: PaperProps;
    scrollContent?: boolean;
    square?: boolean;
    title?: string;
    TypographyProps?: TypographyProps;
};

// TODO: figure out how to scroll only content and not entire section
const Section = ({
    children,
    className,
    classes,
    PaperProps,
    scrollContent, // TODO: to be implemented
    square: squareProp,
    title,
    TypographyProps,
    ...others
}: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const {square, ...otherPaperProps} = PaperProps ?? {};
    return (
        <SectionRoot
            {...otherPaperProps}
            {...others}
            ref={ref}
            className={clsx(classes?.root, className)}
            square={squareProp ?? square}
            component="section"
            title={typeof title === "string" ? title : ""}>
            {
                title &&
                <Header title={title} TypographyProps={TypographyProps} />
            }
            {/* <SectionContent scrollContent> */}
            <SectionContent>
                {children}
            </SectionContent>
        </SectionRoot>
    );
};

Section.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.shape({
        root: PropTypes.string,
        title: PropTypes.string
    }),
    PaperProps: PropTypes.object,
    title: PropTypes.string,
    typographyProps: PropTypes.object
};

export default forwardRef<HTMLDivElement, Props>(displayName()(Section));
