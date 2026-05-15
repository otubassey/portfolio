import { FalloutError, HttpClient, OperationPipeline } from "@otuekong-portfolio/common";
import { ServerComponentHealth } from "@otuekong-portfolio/infrastructure-server";

export type SystemHealthReport = Record<string, ServerComponentHealth>;

class SystemHealthHttpClient extends HttpClient {
    public checkHealth(
		endpointUrl: string
	): OperationPipeline<any, Response, SystemHealthReport> {
        return this.open()
            .get(endpointUrl)
            .pipe()
            .after(async (response: Response): Promise<SystemHealthReport> => {
                if(!response.ok) {
                    throw new FalloutError(
						`Diagnostics fetch failed: ${response.statusText}`,
						 "",
						 response.status
					);
                }
                return await response.json();
            });
    }
}

export default SystemHealthHttpClient;
