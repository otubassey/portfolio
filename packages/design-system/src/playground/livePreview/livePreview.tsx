"use client";

import { Card } from "../../components";

interface LivePreviewProps {
	children: React.ReactNode;
	background?: 'light' | 'dark' | 'grid';
}

function LivePreview({
	children,
	background = 'grid'
}: LivePreviewProps) {
	const backgrounds = {
		light: 'bg-white',
		dark: 'bg-gray-900',
		grid: 'bg-white dark:bg-gray-900',
	};

	return (
		<Card className="p-0 overflow-hidden">
			<div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
				<h3 className="text-sm font-semibold text-gray-900 dark:text-white">
				Preview
				</h3>
			</div>
			<div className={`p-8 min-h-[300px] flex items-center justify-center ${backgrounds[background]}`}>
				{background === 'grid' && (
				<div className="absolute inset-0 opacity-5"
					style={{
						backgroundImage: `linear-gradient(#000 1px, transparent 1px),
										linear-gradient(90deg, #000 1px, transparent 1px)`,
						backgroundSize: '20px 20px',
					}}
				/>
				)}
				<div className="relative z-10">
				{children}
				</div>
			</div>
		</Card>
	);
}

export default LivePreview;

