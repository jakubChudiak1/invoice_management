import dotenv from "dotenv-safe";
import express, { Express } from "express";
import UsersRoutes from "./routes/users";
import AuthsRoutes from "./routes/auths";
import GroupsRoutes from "./routes/groups";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import sessionMiddleware from "./middleware/sessions";
import UsersGroupsRoutes from "./routes/usersGroups";
import InvoicesRoutes from "./routes/invoices";
import UsersInvoicesRoutes from "./routes/usersInvoices";
import NotificationsRoutes from "./routes/notifications";
import LanguagesRoutes from "./routes/languages";
import InvoiceFoldersRoutes from "./routes/invoiceFolders";
import FilesRoutes from "./routes/files";

dotenv.config();

const app: Express = express();

const userRoutes = new UsersRoutes();
const authRoutes = new AuthsRoutes();
const groupRoutes = new GroupsRoutes();
const usersGroupRoutes = new UsersGroupsRoutes();
const invoiceRoutes = new InvoicesRoutes();
const userInvoicesRoutes = new UsersInvoicesRoutes();
const notificationRoutes = new NotificationsRoutes();
const languageRoutes = new LanguagesRoutes();
const invoiceFoldersRoutes = new InvoiceFoldersRoutes();
const fileRoutes = new FilesRoutes();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMiddleware);

app.use("/users", userRoutes.userRoutes());
app.use("/auth", authRoutes.authsRoutes());
app.use("/groups", groupRoutes.groupRoutes());
app.use("/users-groups", usersGroupRoutes.usersGroupsRoutes());
app.use("/invoices", invoiceRoutes.invoicesRoutes());
app.use("/users-invoices", userInvoicesRoutes.userInvoicesRoutes());
app.use("/notifications", notificationRoutes.notificationsRoutes());
app.use("/languages", languageRoutes.languageRoutes());
app.use("/invoice-folders", invoiceFoldersRoutes.invoiceFoldersRoutes());
app.use("/files", fileRoutes.filesRoutes());

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is working");
});
