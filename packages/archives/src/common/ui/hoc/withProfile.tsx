"use client";

import { ComponentType } from "react";

/**
 * A curried HOC for injecting data into components.
 * Usage: withProfile(data)(Component, mapper)
 */
function withProfile<DSource>(dataSource: DSource) {
	return <T extends object>(
		Component: ComponentType<T>,
		mapFn: (data: DSource) => Partial<T>
	) => {
		const WrappedComponent = (props: any) => {
			const injectedProps = mapFn(dataSource) ?? {};
			return <Component {...injectedProps} {...props} />;
		};

		WrappedComponent.displayName = `withProfile(${Component.displayName || Component.name})`;
		return WrappedComponent;
	};
}

withProfile.displayName = "withProfile";

export default withProfile;
