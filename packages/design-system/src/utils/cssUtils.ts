"use client";

import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

/**
 * Merges multiple Tailwind CSS class names into a single string.
 *
 * This utility combines `clsx` for conditional class logic and `tailwind-merge`
 * to ensure that conflicting Tailwind classes (e.g., 'bg-red-500' vs 'bg-blue-500')
 * are resolved correctly, with the last-applied class taking precedence.
 *
 * @param classes - An array of classes, conditional expressions, or nested arrays.
 * @returns A consolidated and optimized string of Tailwind CSS classes.
 *
 * @example
 * // Basic usage
 * mergeClasses("px-2 py-1", "bg-blue-500");
 *
 * @example
 * // Conditional classes
 * mergeClasses("base-style", isSelected && "bg-green-500", !isActive && "opacity-50");
 *
 * @example
 * // Resolving Tailwind conflicts (returns "p-4")
 * mergeClasses("p-2", "p-4");
 */
function mergeClasses(...classes: Array<ClassValue>) {
	return twMerge(clsx(classes));
}

const CssUtils = {
	mergeClasses
} as const;

export default CssUtils;
