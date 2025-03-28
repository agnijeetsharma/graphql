export const graphqlSchema = `#graphql
type User {
  email: String
  password: String
  name: String
  role: String
  courses:[Course]
}
type Course{
    _id: ID!
    title:String
    description:String
    thumbnail:String
    instructor:User!
}
  type Query {
    users:[User]
    courses:[Course]
    course(id:ID!):Course
  }
  type Mutation {
    createUser(email: String!, password: String!, name: String!, role: String!): User
    # createCourse(title:String!,description:String!,thumbnail:String!,instructor:ID!):Course
  }
  type Subscription {
    userCreated: User!
  }

`;
