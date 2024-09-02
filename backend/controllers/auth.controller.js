import AuthorsSchema from "../models/AuthorsSchema.js";
import Bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

// *** .select(+password) indica di prendere i campi + la password
// *** .select(+password) indica di prendere i campi - la password

/** POST /login => restituisce token di accesso */
export const PostLogin = async (req, res) => {
  try {
    /** cerco la mail nel database */
    const Author = await AuthorsSchema.findOne({
      email: req.body.email,
    }).select("+password");
    /** se la mail non esiste chiudo la funzione col return di un messaggio, se esiste vado avanti */
    if (!Author) return res.status(401).send("Wrong credential");
    /** se la mail esiste procedo al controllo password. se è errata chiudo la funzione col return di un messaggio, se è corretta vado avanti */
    console.log("PostLogin Controller - password\n", req.body.password);
    if (!Bcrypt.compare(req.body.password, Author.password))
      return res.status(401).send("Wrong credential");
    /** se è corretta procedo a generare il token e lo restituisco.
     * per generare il token ho bisogno di firmarlo passandogli....
     */
    Jwt.sign(
      /** i dati che deve contenere */
      { author: Author._id },
      /** il mio segreto */
      process.env.JWT_SECRET,
      /** la durata del token */
      { expiresIn: "1h" },
      (err, JwtToken) => {
        /** in caso di errore chiudo la funzione col return */
        if (err) return res.status(401).send();
        /** restituisco il token */
        return res.send({ token: JwtToken });
      }
    );
  } catch (err) {
    res.send({ message: "Login error" });
  }
};

// TODO GET /me => restituisce l'utente collegato al token di accesso
export const GetMe = async (req, res) => {};
// TODO POST /register registrazione autore
export const PostRegister = async (req, res) => {};
// TODO POST /logout logout autore
export const PostLogout = async (req, res) => {};
