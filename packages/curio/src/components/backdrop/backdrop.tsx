"use client";

import { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode, Ref, useEffect, useRef } from "react";

import { useToggle } from "../../hooks";
import { CssUtils } from "../../utils";

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
	open: boolean;
	children?: ReactNode;
	className?: string;
	invisible?: boolean;
	onClose?: () => void;
	overlay?: boolean;
	ref?: Ref<HTMLDivElement>;
}

const Backdrop = ({
	open: openProp,
	children,
	className,
	invisible = false,
	onClose,
	overlay = false,
	ref,
	...props
}: BackdropProps) => {
	const internalRef = useRef<HTMLDivElement>(null);

	const [isOpen, toggleIsOpen] = useToggle(openProp);

	const handleDismiss = () => {
		if(onClose) {
			onClose();
		} else {
			toggleIsOpen(false);
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if(event.key === "Escape") {
			handleDismiss();
		}
	};

	const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
		if(event.target === event.currentTarget) {
			handleDismiss();
		}
	};

	useEffect(() => {
		toggleIsOpen(openProp);
	}, [openProp]);

	useEffect(() => {
		if(typeof ref === "function") {
			ref(internalRef.current);
		} else if(ref) {
			(ref as any).current = internalRef.current;
		}
	}, [ref]);

	useEffect(() => {
		if(isOpen) {
			internalRef.current?.focus();
		}
	}, [isOpen]);

	if(!isOpen) {
		return null;
	}

	return (
		<div
			ref={internalRef}
			aria-hidden="true"
			className={CssUtils.mergeClasses(
				"fixed inset-0 flex items-center justify-center transition-opacity duration-300 outline-none",
				invisible ? "bg-transparent" : "bg-black/50 dark:bg-black/70",
				!overlay ? "z-ps-backdrop-clipped" : "z-ps-backdrop",
				className
			)}
			onClick={handleBackdropClick}
			onKeyDown={handleKeyDown}
			role="presentation"
			tabIndex={-1}
			{...props}>

			<div className="contents pointer-events-auto">
				{children}
			</div>

		</div>
	);
};

Backdrop.displayName = "Backdrop";

export default Backdrop;
