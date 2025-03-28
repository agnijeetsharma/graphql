import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App.tsx";
import { client } from "../apolloClient.js";

// const memoryCache = new InMemoryCache();

// const client = new ApolloClient({
//   uri: import.meta.env.VITE_GRAPHQL_URI,
//   cache: memoryCache,
// });
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
