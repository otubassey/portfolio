import { Ref, SVGAttributes } from "react";

interface TimelineGallerySvgProps extends SVGAttributes<SVGSVGElement> {
	ref?: Ref<SVGSVGElement>;
}

const TimelineGallerySvg = ({
	className,
	height = 64,
	ref,
	width = 64,
	...props
}: TimelineGallerySvgProps) => (
	<svg
		ref={ref}
		aria-hidden="true"
		fill="none"
		height={height}
		viewBox="0 0 64 64"
		width={width}
		xmlns="http://www.w3.org/2000/svg"
		{...props}>

		{/* Background - Gallery wall */}
		<rect width="64" height="64" fill="#2d3748" rx="32"/>
		
		{/* First frame (left, past) - slightly faded */}
		<g opacity="0.7">
			<rect x="6" y="16" width="16" height="20" fill="#1a202c" stroke="#4a5568" strokeWidth="1.5" rx="1"/>
			<rect x="8" y="18" width="12" height="16" fill="#2d3748"/>
			<text x="10" y="28" fontFamily="monospace" fontSize="6" fill="#718096">HTML</text>
		</g>
		
		{/* Second frame (center-left) */}
		<g opacity="0.85">
			<rect x="16" y="12" width="18" height="24" fill="#1a202c" stroke="#4a5568" strokeWidth="1.5" rx="1"/>
			<rect x="18" y="14" width="14" height="20" fill="#2d3748"/>
			<text x="20" y="26" fontFamily="monospace" fontSize="6" fill="#63b3ed">React</text>
		</g>
		
		{/* Third frame (center-right, current/featured) */}
		<g>
			<rect x="30" y="8" width="20" height="28" fill="#1a202c" stroke="#3182ce" strokeWidth="2" rx="1"/>
			<rect x="32" y="10" width="16" height="24" fill="#2d3748"/>
			<text x="34" y="24" fontFamily="monospace" fontSize="7" fill="#4299e1" fontWeight="bold">TS</text>
			{/* Spotlight effect */}
			<circle cx="40" cy="22" r="10" fill="#3182ce" opacity="0.1"/>
		</g>
		
		{/* Fourth frame (right, future) - slightly faded */}
		<g opacity="0.7">
			<rect x="44" y="14" width="16" height="22" fill="#1a202c" stroke="#4a5568" strokeWidth="1.5" rx="1"/>
			<rect x="46" y="16" width="12" height="18" fill="#2d3748"/>
			<text x="48" y="27" fontFamily="monospace" fontSize="6" fill="#9ae6b4">AI</text>
		</g>
		
		{/* Timeline connector line */}
		<line x1="8" y1="50" x2="56" y2="50" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
		<circle cx="14" cy="50" r="2" fill="#718096"/>
		<circle cx="25" cy="50" r="2" fill="#63b3ed"/>
		<circle cx="40" cy="50" r="3" fill="#3182ce"/>
		<circle cx="52" cy="50" r="2" fill="#9ae6b4"/>

	</svg>
)

TimelineGallerySvg.displayName = "TimelineGallerySvg";

export default TimelineGallerySvg;
