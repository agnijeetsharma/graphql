// declare module "graphql-subscriptions" {
//   interface PubSub {
//     asyncIterator<T>(triggers: string | string[]): AsyncIterableIterator<T>;
//   }
// }

import Usertype, { User } from "../../models/userModel.js";
// import { PubSub } from "graphql-subscriptions";
import { getUsers, getUserById } from "../../controllers/userController.js";
import { pubsub } from "../subscriptions/redis-subscription.js";
import {
  getAllCourses,
  getCourseById,
  getUserCourses,
} from "../../controllers/courseConroller.js";
import { createUser } from "../../controllers/userController.js";

export const graphqlResolvers = {
  Mutation: {
    createUser: async (parent: any, args: any) => {
      const user = await createUser(args);
      // console.log("it is subscription",user)
      console.log("Publishing USER_CREATED event..."); // Debugging log
      await pubsub.publish("USER_CREATED", { userCreated: user });
      return user;
    },
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
      subscribe: () => pubsub.asyncIterator(["USER_CREATED"]),
    },
  },
};
