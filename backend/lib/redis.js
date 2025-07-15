import Redis from "ioredis"
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis(process.env.UPSTASH_REDIS_URL);
redis.set('foo', 'bar')
    .then(()=> console.log("Redis connection test passed"))
    .catch((err)=> console.error("Redis error:", err));

export default redis;