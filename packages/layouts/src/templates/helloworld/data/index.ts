import { APP_DETAILS as HELLOWORLD_V1_APP_DETAILS } from "./helloworld-v1.data";
import { APP_DETAILS as HELLOWORLD_V2_APP_DETAILS } from './helloworld-v2.data';

export const getAppDetails = (version: 1 | 2) => (
	version === 2 ? HELLOWORLD_V2_APP_DETAILS : HELLOWORLD_V1_APP_DETAILS
);

export {
	HELLOWORLD_V1_APP_DETAILS,
	HELLOWORLD_V2_APP_DETAILS
};
