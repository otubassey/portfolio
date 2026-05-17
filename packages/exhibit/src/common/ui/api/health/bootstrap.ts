import SystemHealthHttpClient from "./systemHealthHttpClient";
import SystemHealthService from "./systemHealthService";

export const ConfiguredSystemHealthService = new SystemHealthService(
	new SystemHealthHttpClient()
);
