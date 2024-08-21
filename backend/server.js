import express from "express";
import cors from "cors";
import AuthorsRouter from "./routes/authors.router.js";
import mongoose from "mongoose";
import "dotenv/config";
import PostsRouter from "./routes/posts.router.js";
import morgan from "morgan";

/** dichiaro la porta da usare */
const PORT = process.env.PORT || 5000;
/** dichiaro il server */
const SERVER = express();
SERVER.use(morgan("dev"))
/** dichiaro l'utilizzo di cors e json */
SERVER.use(cors());
SERVER.use(express.json());
/** uso le rotte */
SERVER.use("/authors", AuthorsRouter);
SERVER.use("/blogPosts", PostsRouter);
/** connessione al database */
await mongoose
  .connect(process.env.MONGO_CONNECTION_URI)
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log(err));
/** in ascolto sulla porta */
SERVER.listen(PORT, () => {
  console.log(`server in ascolto su porta ${process.env.HOST}:${PORT}`);
});
