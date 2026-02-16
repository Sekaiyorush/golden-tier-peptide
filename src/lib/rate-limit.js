import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
    points: 5, // 5 attempts
    duration: 60, // Per 60 seconds
});

export async function rateLimit(key) {
    try {
        await rateLimiter.consume(key);
        return false; // Not limited
    } catch (res) {
        return true; // Limited
    }
}
