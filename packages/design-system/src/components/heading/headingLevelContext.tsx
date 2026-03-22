"use client";

import React, { createContext, FC, ReactNode, useContext } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HeadingLevelContext = createContext<HeadingLevel>(1);

const calculateNextLevel = (currentLevel: HeadingLevel): HeadingLevel => (
	Math.min(currentLevel + 1, 6) as HeadingLevel
);

export const useHeadingLevel = (): HeadingLevel => (
	useContext(HeadingLevelContext)
);

export const useNextHeadingLevel = (): HeadingLevel => (
	calculateNextLevel(useHeadingLevel())
);

interface HeadingLevelProviderProps {
	children: ReactNode;
	level?: HeadingLevel;
}

export const HeadingLevelProvider: FC<HeadingLevelProviderProps> = ({ 
	children, 
	level 
}) => {
	const currentLevel = useHeadingLevel();
	const nextLevel = level ?? calculateNextLevel(currentLevel);

	return (
		<HeadingLevelContext.Provider value={nextLevel}>
			{children}
		</HeadingLevelContext.Provider>
	);
};

HeadingLevelProvider.displayName = "HeadingLevelProvider";

export default HeadingLevelContext;
