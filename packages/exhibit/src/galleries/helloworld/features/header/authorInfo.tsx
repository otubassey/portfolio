import { Identity } from "@otuekong-portfolio/features";

import { CssUtils, Icon, IconName } from "@otuekong-portfolio/curio";

interface AuthorInfoProps {
	className?: string;
	iconName?: IconName;
}

function AuthorInfo({
	className,
	iconName = "curators-loupe"
}: AuthorInfoProps) {
	return (
		<div className={CssUtils.mergeClasses("flex items-center gap-3", className)}>
			<div
				className={CssUtils.mergeClasses(
					"w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg",
					"flex items-center justify-center text-white font-bold shrink-0"
				)}>
				<Icon
					aria-hidden={false}
					name={iconName}
					size={34}
				/>
			</div>

			<div className="min-w-0 flex flex-col gap-1">
				<Identity />
			</div>
		</div>
	);
};

export default AuthorInfo;
