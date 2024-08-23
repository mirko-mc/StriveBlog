import express from "express";
import cors from "cors";
import AuthorsRouter from "./routes/authors.router.js";
import mongoose from "mongoose";
import "dotenv/config";
import PostsRouter from "./routes/posts.router.js";
import morgan from "morgan";
import helmet from "helmet";
import endpoints from "express-list-endpoints";

/** dichiaro la porta da usare */
const Port = process.env.PORT || 5000;
/** dichiaro il server */
const Server = express();
/** morgan mostra in console le info sulle chiamate CRUD al server */
Server.use(morgan("dev"));
/** aggiunge alcuni headers alle risposte e ne nasconde altri per migliorare la sicurezza dell'api */
Server.use(helmet());
/** cors permette la comunicaizone tra frontend e backend su porte differenti */
Server.use(cors());
/** abilitazione all'utilizzo di json */
Server.use(express.json());
/** uso le rotte */
Server.use("/authors", AuthorsRouter);
Server.use("/blogPosts", PostsRouter);
/** connessione al database */
await mongoose
  .connect(process.env.MONGO_CONNECTION_URI)
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log(err));
/** in ascolto sulla porta */
Server.listen(Port, () => {
  console.log(`server in ascolto su porta ${process.env.HOST}:${Port}`);
  console.table(endpoints(Server));
});
