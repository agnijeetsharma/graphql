import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./src/database/db.js";
import { connectGraphQL, graphqlschema } from "./src/graphql/graphQL.js";
import { expressMiddleware } from "@apollo/server/express4";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

dotenv.config();

const port = Number(process.env.PORT) || 3000;

connectDB()
  .then(() => console.log("Mongoose Database connected"))
  .catch((e) => console.log(e));

const graphQLserver = connectGraphQL();
await graphQLserver.start();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/graphql", expressMiddleware(graphQLserver));

// from 30 to 35 mainly for subscrption part for graphql
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
useServer({ schema: graphqlschema }, wsServer);



app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


//subsription part
httpServer.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/graphql`);
  console.log(`🔄 WebSocket running at ws://localhost:${port}/graphql`);
});
