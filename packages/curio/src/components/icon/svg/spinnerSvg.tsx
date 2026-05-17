import { Ref, SVGAttributes } from "react";

import { CssUtils } from "../../../utils";

interface SpinnerSvgProps extends SVGAttributes<SVGSVGElement> {
	ref?: Ref<SVGSVGElement>;
}

const SpinnerSvg = ({
	className,
	fill="currentColor",
	ref,
	...props
}: SpinnerSvgProps) => (
	<svg
		ref={ref}
		aria-hidden="true"
		className={CssUtils.mergeClasses("animate-spin", className)}
		fill={fill}
		viewBox="0 0 24 24"
		{...props}>
		<circle cx="12" cy="3" r="2" />
		<circle cx="18.36" cy="5.64" r="2" className="opacity-90" />
		<circle cx="21" cy="12" r="2" className="opacity-75" />
		<circle cx="18.36" cy="18.36" r="2" className="opacity-60" />
		<circle cx="12" cy="21" r="2" className="opacity-45" />
		<circle cx="5.64" cy="18.36" r="2" className="opacity-30" />
		<circle cx="3" cy="12" r="2" className="opacity-20" />
		<circle cx="5.64" cy="5.64" r="2" className="opacity-10" />
	</svg>
);

SpinnerSvg.displayName = "SpinnerSvg";

export default SpinnerSvg;
