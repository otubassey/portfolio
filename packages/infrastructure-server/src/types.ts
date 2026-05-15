import { DeferredOperationBuilder } from "@otuekong-portfolio/common";

export interface ServerComponentHealth {
    isHealthy: boolean;
    latencyMs: number;
    timestamp: string;
}

export interface ServerComponentMonitor {
    health(): DeferredOperationBuilder<ServerComponentHealth>;
}
