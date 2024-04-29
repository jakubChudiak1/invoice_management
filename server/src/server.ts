import dotenv from "dotenv-safe";
import express, { Express } from "express";
import UsersRoutes from "./routes/users";
import cors from "cors";
const app: Express = express();
const userRoutes = new UsersRoutes();

app.use(cors());
app.use("/users", userRoutes.userRoutes);

app.listen(8080, () => {
  console.log("Server is working");
});
