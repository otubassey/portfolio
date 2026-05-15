import { ConfiguredSystemHealthHandler } from "@otuekong-portfolio/infrastructure-server";

import createNextRoute from "./createNextRoute";

export const getSystemHealthHandler = createNextRoute(ConfiguredSystemHealthHandler);
