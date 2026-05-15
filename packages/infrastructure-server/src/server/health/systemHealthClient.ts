import { DeferredOperationBuilder, ExecutionResult, ServerComponentClient } from "@otuekong-portfolio/common";

import { ServerComponentHealth, ServerComponentMonitor } from "../../types";

class SystemHealthClient extends ServerComponentClient {

    constructor(
        private readonly monitors: Map<string, ServerComponentMonitor>
    ) {
        super();
        if(!monitors || monitors.size === 0) {
            throw new Error("SystemHealthClient requires at least one ServerComponentMonitor instance to run checks.");
        }
    }

    public checkHealth(): DeferredOperationBuilder<Record<string, ServerComponentHealth>> {
        return this.create(async (): Promise<ExecutionResult<Record<string, ServerComponentHealth>>> => {
            const report: Record<string, ServerComponentHealth> = {};
            const executionPromises: Array<Promise<void>> = [];

            try {
                for(const [componentName, monitor] of this.monitors.entries()) {
                    const taskPromise = (async () => {
                        const builder = monitor.health();
                        const result = await builder.invoke();

                        if (result.success && result.data) {
                            report[componentName] = result.data;
                        } else {
                            report[componentName] = {
                                isHealthy: false,
                                latencyMs: 0,
                                timestamp: new Date().toISOString()
                            };
                        }
                    })();

                    executionPromises.push(taskPromise);
                }

                await Promise.all(executionPromises);

                return {
                    success: true,
                    data: report,
                    error: null
                };
            } catch (error: any) {
                return {
                    success: false,
                    data: null,
                    error
                };
            }
        });
    }
}

export default SystemHealthClient;
