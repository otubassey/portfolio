import { Icon } from "@otuekong-portfolio/curio";

const SimpleVariant = () => (
	<div className="text-center py-12">
		<div className="inline-flex p-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-10 shadow-xl rotate-3">
			<Icon
				aria-label="Visual representation of tech stack including React, TypeScript, and AI"
				className="text-white -rotate-3"
				hideAriaLabel
				name="timeline-gallery"
				role="img"
				size={160}
			/>
		</div>
	</div>
);

SimpleVariant.displayName = "SimpleVariant";

export default SimpleVariant;
