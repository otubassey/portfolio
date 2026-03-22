"use client";

import { ElementType, ReactNode, Ref, useId, useImperativeHandle, useRef } from "react";

import { HeadingLevelProvider, HeadingProps } from "../heading";
import { TypographyProps } from "../typography";

import SectionHeading from "./sectionHeading";
import { Surface, SurfaceProps } from "../surface";

export interface SectionHandle {
	scroll: (options?: ScrollIntoViewOptions) => void;
}

export type SectionProps<T extends ElementType = "div"> = Omit<SurfaceProps<T>, "elevation" | "component" | "square" | "variant"> & {
	heading?: ReactNode;
	headingProps?: Omit<HeadingProps, "children">;
	id?: string;
	raised?: boolean;
	ref?: Ref<SectionHandle>;
	rounded?: boolean;
	subtitle?: ReactNode;
	subtitleProps?: Omit<TypographyProps, "children">;
};

const Section = <T extends ElementType = "div">({
	children,
	className = "",
	heading,
	headingProps,
	id,
	raised = false,
	ref,
	rounded = false,
	subtitle,
	subtitleProps,
	...props
}: SectionProps<T>) => {
	const internalRef = useRef<HTMLDivElement>(null);
	const generatedId = useId();
	const componentId = id || generatedId;
	const effectiveElevation = raised ? 4 : 0;

	useImperativeHandle(ref, () => ({
		scroll: (options?: ScrollIntoViewOptions) => {
			const node = internalRef.current;

			if(node?.checkVisibility()) {
				node.scrollIntoView({
					behavior: "smooth",
					block: "start",
					...options,
				});
			}
		}
	}), []);

	return (
		<HeadingLevelProvider>
			<Surface
				ref={internalRef}
				aria-labelledby={`${componentId}-heading-label`}
				className={className}
				component="section"
				elevation={effectiveElevation}
				id={componentId}
				rounded={rounded}
				{...props}>

				<SectionHeading
					heading={heading}
					headingProps={{
						id: `${componentId}-heading-label`,
						...headingProps
					}}
					subtitle={subtitle}
					subtitleProps={subtitleProps}
				/>

				{children}

			</Surface>
		</HeadingLevelProvider>
	);
};

Section.displayName = "Section";

export default Section;
