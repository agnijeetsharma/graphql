import { gql } from "@apollo/client"


export const getUsers=`#graphql
query Query{
    users{
    name
    role
    password
    email
    courses{
        title
    }
    }
}

`


export const createUser = `#graphql
  mutation CreateUser($email: String!, $password: String!, $name: String!, $role: String!) {
    createUser(email: $email, password: $password, name: $name, role: $role) {
      email
      name
      role
    }
  }
`;

export const subscribeToUser = gql`
  subscription {
    userCreated {
      email
      name
      role
    }
  }
`;
