import express from "express";
import cors from "cors";
import AuthorsRouter from "./routes/author.router.js";
import mongoose from "mongoose";
import 'dotenv/config';

/** dichiaro la porta da usare */
const port = 5000;
/** dichiaro il server */
const server = express();
/** dichiaro l'utilizzo di cors e json */
server.use(cors());
server.use(express.json());
/** uso la rotta */
server.use("/authors", AuthorsRouter);
/** connessione al database */
await mongoose
  .connect(process.env.MONGO_CONNECTION_URI)
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log(err));
/** in ascolto sulla porta */
server.listen(port, () => {
  console.log(`server in ascolto sulla porta ${port}`);
});
