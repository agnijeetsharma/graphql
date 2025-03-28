
// declare module "graphql-subscriptions" {
//   interface PubSub {
//     asyncIterator<T>(triggers: string | string[]): AsyncIterableIterator<T>;
//   }
// }
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

// Define Redis connection options
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



import Usertype, { User } from "../../models/userModel.js";
// import { PubSub } from "graphql-subscriptions";
import { getUsers, getUserById } from "../../controllers/userController.js";
import {
  getAllCourses,
  getCourseById,
  getUserCourses,
} from "../../controllers/courseConroller.js";
import { createUser } from "../../controllers/userController.js";


// export const pubsub = new PubSub();


// import { RedisPubSub } from 'graphql-redis-subscriptions';
// import Redis from 'ioredis';
// const RedisClient = Redis.default || Redis;


// const options = {
//   host: "127.0.0.1",
//   port: 6379,
// };
// export const pubsub = new RedisPubSub({
//   publisher: new RedisClient(options),
//   subscriber: new RedisClient(options),
 
// });


export const graphqlResolvers = {
  Mutation: {
    createUser: async (parent: any, args: any) =>{
      const user=await createUser(args)
      console.log("it is subscription",user)
      console.log("Publishing USER_CREATED event...",user); // Debugging log
      await pubsub.publish("USER_CREATED", { userCreated: user });
      return user;
    }
  },
  Query: {
    users: getUsers,
    courses: getAllCourses,
    course: getCourseById,
  },
  Course: {
    instructor: async (course: any) => getUserById(course.instructor),
  },
  User: {
    courses: async (user: any) => getUserCourses(user),
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator(["USER_CREATED"]) // ✅ Correct way
    }
  }
};
