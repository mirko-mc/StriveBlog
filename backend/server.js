import express from "express";
import cors from "cors";
import AuthorsRouter from "./routes/authors.router.js";
import AuthRouter from "./routes/auth.routes.js";
import mongoose from "mongoose";
import "dotenv/config";
import PostsRouter from "./routes/posts.router.js";
import morgan from "morgan";
import helmet from "helmet";
import endpoints from "express-list-endpoints";
import passport from "passport";
import GoogleStrategy from "./config/passport.config.js";
import { Authorization } from "./middlewares/authorization.js";

/** dichiaro la porta da usare */
const Port = process.env.PORT || 5000;
/** dichiaro il server */
const Server = express();
/** abilito l'uso della strategia google di passport */
passport.use("google", GoogleStrategy);
/** morgan mostra in console le info sulle chiamate CRUD al server */
Server.use(morgan("dev"));
/** aggiunge alcuni headers alle risposte e ne nasconde altri per migliorare la sicurezza dell'api */
Server.use(helmet());
/** cors permette la comunicazione tra frontend e backend su porte differenti ed accetta qualsiasi chiamata */
// Server.use(cors());
// * configurazione cors
/** dichiaro gli indirizzi accettati in chiamata */
const WhiteList = [
  "https://strive-blog-six.vercel.app",
  "http://localhost:3000",
];
// ["frontend1", "frontend2"]
/** dichiaro l'oggetto cors che validerà l'accesso all'API */
const CorsOptions = {
  origin: function (origin, callback) {
    /** se l'indirizzo che chiama l'API è incluso nella lista degli indirizzi consentiti */
    if (WhiteList.indexOf(origin) !== -1 || !origin) {
      /** ritorno true, ha accesso all'API */
      callback(null, true);
    } else {
      /** altrimenti gli schiaffo un bell'errore che non gli è consentito l'utilizzo dell'API */
      callback(new Error("Not allowed by CORS"));
    }
  },
};
/** utilizzo CORS passandogli l'oggetto CorsOption per validare il chiamante */
Server.use(cors(CorsOptions));
// fine configurazione cors
/** abilitazione all'utilizzo di json */
Server.use(express.json());
/** uso le rotte */
Server.use("/authors",/** Authorization,*/ AuthorsRouter);
Server.use("/blogPosts",/** Authorization, */ PostsRouter);
Server.use("/", AuthRouter);
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
