import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

import routes from "./src/routes/";

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server Fired at ${port}`);
});
