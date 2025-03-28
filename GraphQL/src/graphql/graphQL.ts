import { graphqlSchema } from "./schema/schema.js";
import { graphqlResolvers } from "./resolvers/resolvers.js";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';
 


//WITHOUT EXPRESS SERVER
//  export const connectGrpahQL = async (port: number) => {

//   const server = new ApolloServer({
//     // typeDefs: `type Query{hello:String,hi:String}`,     //schema for the server for testing
//     typeDefs: graphqlSchema, //actual define schema for Graphql
//     resolvers: graphqlResolvers,
//   });
//   startStandaloneServer(server, {
//     listen: {
//      port,
//     },
//   })
//     .then(() => {
//       console.log("Server started");
//     })
//     .catch(() => {
//       console.log("Server failed to start");
//     });
// };




// WITH EXPRESS SERVER


// export const connectGraphQL = () => {

//   const server = new ApolloServer({
   
//     typeDefs: graphqlSchema, 
//     resolvers: graphqlResolvers,
//   });
//  return server;
// };



//for subsription part

import { makeExecutableSchema } from "@graphql-tools/schema";

export const graphqlschema = makeExecutableSchema({  typeDefs: graphqlSchema,   resolvers: graphqlResolvers, });
export const connectGraphQL = () => {

  const server = new ApolloServer({
   
    schema:graphqlschema
  });
 return server;
};








