import { Ref, SVGAttributes } from "react";

interface CuratorsLoupeSvgProps extends SVGAttributes<SVGSVGElement> {
	ref?: Ref<SVGSVGElement>;
}

const CuratorsLoupeSvg = ({
	className,
	height = 64,
	ref,
	width = 64,
	...props
}: CuratorsLoupeSvgProps) => (
	<svg
		ref={ref}
		aria-hidden="true"
		fill="none"
		height={height}
		viewBox="0 0 64 64"
		width={width}
		xmlns="http://www.w3.org"
		{...props}>

		{/* Deep Background */}
		<circle cx="32" cy="32" r="30" fill="#1e293b" />
		
		{/* Magnifying Glass Handle */}
		<rect 
			x="42" y="42" width="18" height="6" 
			rx="3" transform="rotate(45 42 42)" 
			fill="#64748b" 
		/>
		
		{/* Outer Rim */}
		<circle cx="28" cy="28" r="18" fill="#0f172a" stroke="#94a3b8" strokeWidth="2.5"/>
		
		{/* Inner Lens Glass */}
		<circle cx="28" cy="28" r="15" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />
		<circle cx="28" cy="28" r="14" fill="#3182ce" opacity="0.05" />
		
		{/* Code Content - Using standard SVG text with baseline safety */}
		<g style={{ font: 'bold 5px ui-monospace, monospace', userSelect: 'none' }}>
			<text x="20" y="24" fill="#10b981">const</text>
			<text x="20" y="30" fill="#60a5fa">code</text>
			<text x="34" y="30" fill="#f59e0b">=</text>
			<text x="20" y="36" fill="#a78bfa">'art'</text>
		</g>
		
		{/* Glass Reflection */}
		<circle cx="20" cy="20" r="2.5" fill="white" opacity="0.3" />

	</svg>
)

CuratorsLoupeSvg.displayName = "CuratorsLoupeSvg";

export default CuratorsLoupeSvg;
