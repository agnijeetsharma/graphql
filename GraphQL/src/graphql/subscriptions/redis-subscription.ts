import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

// Define Redis connection options------

// <------REDIS SETUP BEFORE THE ACTUAL CONNECTION START REDIS USING WSL ---->
const options: Redis.RedisOptions = {
  host: '127.0.0.1',
  port: 6379,
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
};

// Explicitly type the Redis instances
const publisher = new Redis(options);
const subscriber = new Redis(options);

// Properly type the RedisPubSub instance
const pubsub: RedisPubSub = new RedisPubSub({
  publisher,
  subscriber,
});

export { pubsub };
