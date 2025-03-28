// import DataLoader from "dataloader";
// import UserModel from "../models/User"; 

// // Batch function to load multiple users at once
// const batchUsers = async (userIds: string[]) => {
//   const users = await UserModel.find({ _id: { $in: userIds } });
//   const userMap = new Map(users.map(user => [user._id.toString(), user]));
//   return userIds.map(id => userMap.get(id));
// };

// // Create DataLoader instance
// export const userLoader = new DataLoader(batchUsers);




// const resolvers = {
//     Query: {
//       users: async () => await UserModel.find(), // Fetch all users
//     },
//     User: {
//       posts: async (parent, _, { postLoader }) => {
//         return await postLoader.load(parent.id); // Use DataLoader for posts
//       },
//     },
//   };
  
// import { ApolloServer } from "apollo-server-express";
// import { userLoader } from "./dataloaders/userLoader";
// import { postLoader } from "./dataloaders/postLoader";

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: () => ({
//     userLoader,
//     postLoader,
//   }),
// });
