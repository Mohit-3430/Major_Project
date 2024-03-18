import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Healthy");
});

import routes from "./src/routes/";

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server Fired at ${port}`);
});
