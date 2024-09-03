import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { Authorization } from "../middlewares/authorization.js";
import passport from "passport";

const Router = express.Router();

/** POST /login => restituisce token di accesso */
Router.post("/login", AuthController.PostLogin);

// TODO - GET /me => restituisce l'utente collegato al token di accesso
Router.get("/me", Authorization, AuthController.GetMe);

// TODO - POST
Router.post("/register", AuthController.PostRegister);

// TODO - POST
Router.post("/logout", Authorization, AuthController.PostLogout);

// TODO - GET login Google
Router.get(
  "/login-google",
  /** middleware di passport che ridireziona alla pagina google */
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// TODO - GET callback Google
Router.get(
  "/callback-google",
  /** session a false per disattivare la sessione usando i cookie, riceve i dati del profilo e crea il jwt aggiungendolo in req.author */
  passport.authenticate("google", { session: false }),
  /** ridireziona al frontend passando il jwt come query string nell'url */
  AuthController.GetCallbackGoogle
);

export default Router;
