import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { Authorization } from "../middlewares/authorization.js";

const Router = express.Router();

/** POST /login => restituisce token di accesso */
Router.post("/login", AuthController.PostLogin);

// TODO - GET /me => restituisce l'utente collegato al token di accesso
Router.get("/me", Authorization, AuthController.GetMe);

// TODO - POST
Router.post("/register", AuthController.PostRegister);
// TODO - POST
Router.post("/logout", Authorization, AuthController.PostLogout);

export default Router;
