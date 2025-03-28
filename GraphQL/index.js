import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/database/db.js";
import { connectGraphQL } from "./src/graphql/graphQL.js";
import { expressMiddleware } from '@apollo/server/express4';
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
app.get("/", (req, res) => {
    res.send("Hello, Express with TypeScript!");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
