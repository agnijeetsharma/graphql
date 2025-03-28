// import { useQuery, gql, useMutation ,useSubscription} from "@apollo/client";
// import { getUsers } from "./graphQL/query/query";
// import { useLazyQuery } from "@apollo/client";
// import { createUser } from "./graphQL/query/query";
// import {subscribeTouser } from "./graphQL/query/query";
// // import { createUser } from "./graphQL/mutation";



// import { useState } from "react";

// const App = () => {
//   // const { loading, error, data } = useQuery(gql(getUsers)); //immediately invoked the query
//   const [getUser, { loading, error, data }] = useLazyQuery(gql(getUsers)); //invoked on some user action
//   const [createNewUser, { data: mutationData, error: mutationError }] =
//   useMutation(gql(createUser));
//   const { data: subscriptionData } = useSubscription(gql(subscribeTouser));

//   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const { data } = await createNewUser({
//         variables: { name, role, password, email },
//       });
//       console.log("User created:", data);
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   type User = {
//     email: string;
//     name: string;
//     password: string;
//     role: string;
//   };
//   const [name, setName] = useState<string>("");
//   const [role, setRole] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   if (error) return <h1>some error occured</h1>;
//   console.log(data);

//   return loading ? (
//     <h1>....loading</h1>
//   ) : (
//     <>
//       <div>
//         <h1>USER_NAME</h1>
//         {data?.users?.map((user: User, index: number) => (
//           <div key={user.password+index}>
//             <h6 >{user?.name}</h6>
//             <h6 >{user?.email}</h6>
//           </div>
//         ))}
//         <button onClick={() => getUser()}>Click me!</button>
//       </div>
//       <h2>New User Updates:</h2>
//       {subscriptionData && <h6>New User: {subscriptionData.userCreated.name}</h6>}

//       <div>
//         <form onSubmit={handleFormSubmit}>
//           <input
//             type="text"
//             value={name}
//             placeholder="enter your name"
//             onChange={(e) => setName(e.target.value)}
//           ></input>
//           <input
//             type="text"
//             placeholder="enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></input>
//           <input
//             type="text"
//             value={email}
//             placeholder="enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//           ></input>
//           <input
//             type="text"
//             value={role}
//             placeholder="enter your Role"
//             onChange={(e) => setRole(e.target.value)}
//           ></input>
//           <button type="submit">Create User</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default App;











import { useQuery, gql, useMutation, useSubscription, useLazyQuery } from "@apollo/client";
import { getUsers, createUser, subscribeToUser } from "./graphQL/query/query";
import { useState } from "react";

const App = () => {
  const [getUser, { loading, error, data }] = useLazyQuery(gql(getUsers));
  const [createNewUser, { error: mutationError }] = useMutation(gql(createUser));
  const { data: subscriptionData } = useSubscription(subscribeToUser);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNewUser({ variables: { name, role, password, email } });
      setName("");
      setRole("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  if (error) return <h1>Some error occurred: {error.message}</h1>;
  if (mutationError) console.error("Mutation error:", mutationError);

  return (
    <>
      <div>
        <h1>Users</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          data?.users?.map((user, index:number) => (
            <div key={user.email + index}>
              <h6>Name: {user.name}</h6>
              <h6>Email: {user.email}</h6>
            </div>
          ))
        )}
        <button onClick={() => getUser()}>Fetch Users</button>
      </div>

      <h2>New User Updates:</h2>
      {subscriptionData?.userCreated && <h6>New User: {subscriptionData.userCreated.name}</h6>}

      <div>
        <h2>Create a New User</h2>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
          <input type="text" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
          <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
          <input type="text" value={role} placeholder="Enter your role" onChange={(e) => setRole(e.target.value)} />
          <button type="submit">Create User</button>
        </form>
      </div>
    </>
  );
};

export default App;

