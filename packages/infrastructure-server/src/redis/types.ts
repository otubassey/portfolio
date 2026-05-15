export interface RateLimitResult {
    limit: number;
	prefix: string;
    remaining: number;
    reset: number;
    success: boolean;
}
