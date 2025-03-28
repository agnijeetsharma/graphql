import { getUsers, getUserById } from "../../controllers/userController.js";
import { getAllCourses, getCourseById, getUserCourses, } from "../../controllers/courseConroller.js";
import { createUser } from "../../controllers/userController.js";
export const graphqlResolvers = {
    Mutation: {
        createUser: async (parent, args) => createUser(args),
    },
    Query: {
        users: getUsers,
        courses: getAllCourses,
        course: getCourseById,
    },
    Course: {
        instructor: async (course) => getUserById(course.instructor),
    },
    User: {
        courses: async (user) => getUserCourses(user),
    },
};
