import { Ref, SVGAttributes } from "react";

interface GlobeInABoxSvgProps extends SVGAttributes<SVGSVGElement> {
	ref?: Ref<SVGSVGElement>;
}

const GlobeInABoxSvg = ({
	className,
	height = 64,
	ref,
	width = 64,
	...props
}: GlobeInABoxSvgProps) => (
	<svg
		ref={ref}
		aria-hidden="true"
		className={className}
		fill="none"
		height={height}
		viewBox="0 0 64 64"
		width={width}
		xmlns="http://www.w3.org/2000/svg"
		{...props}>
		<circle cx="32" cy="32" r="32" fill="#0f172a"/>
		
		{/* Isometric Structure */}
		<path d="M32 16L48 24V40L32 48L16 40V24L32 16Z" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
		<path d="M16 24L32 32L48 24" stroke="#3b82f6" strokeWidth="1.5"/>
		<path d="M32 32V48" stroke="#3b82f6" strokeWidth="1.5"/>
		
		{/* Globe / Language Core */}
		<g transform="translate(32, 32)">
			<circle cx="0" cy="0" r="11" fill="#0f172a" /> {/* Back-cut to make globe pop */}
			<circle cx="0" cy="0" r="10" fill="#3b82f6" opacity="0.15" stroke="#60a5fa" strokeWidth="1"/>
			
			<ellipse cx="0" cy="0" rx="10" ry="3" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5"/>
			<ellipse cx="0" cy="0" rx="3" ry="10" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5"/>
			
			<text x="-6" y="2" fontFamily="system-ui, sans-serif" fontSize="7" fill="#fbbf24" fontWeight="bold">A</text>
			<text x="1" y="6" fontFamily="serif" fontSize="7" fill="#10b981" fontWeight="bold">文</text>
		</g>
		
		{/* Nodes */}
		<circle cx="16" cy="24" r="1.5" fill="#60a5fa"/>
		<circle cx="48" cy="24" r="1.5" fill="#60a5fa"/>
		<circle cx="32" cy="16" r="1.5" fill="#60a5fa"/>
	</svg>
)

GlobeInABoxSvg.displayName = "GlobeInABoxSvg";

export default GlobeInABoxSvg;
