"use client";

import { ReactNode } from "react";

import { ComponentManifest } from "../components";

import { PlaygroundProvider } from "./context";

interface PlaygroundProps {
	children: ReactNode;
	manifest?: ComponentManifest | null;
}

function Playground({
	children,
	manifest
}: PlaygroundProps) {
	return (
		<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mt-4">
			<div className="grid md:grid-cols-2 gap-8">
				<PlaygroundProvider manifest={manifest}>
					{children}
				</PlaygroundProvider>
			</div>
		</div>
	);
}

Playground.displayName = "Playground";

export default Playground;
