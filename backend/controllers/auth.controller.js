import AuthorsSchema from "../models/AuthorsSchema.js";
import Bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

// *** .select(+password) indica di prendere i campi + la password
// *** .select(+password) indica di prendere i campi - la password

/** POST /login => restituisce token di accesso */
export const PostLogin = async (req, res) => {
  try {
    console.log("controllers => auth.controller.js - PostLogin");
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
      /** la durata del token (solo numero sono secondi, stringa numero lettera sono tempi più lunghi (1h, 1m, 1M)*/
      { expiresIn: "1h" },
      (err, JwtToken) => {
        /** in caso di errore chiudo la funzione col return */
        if (err) return res.status(401).send();
        /** restituisco il token */
        return res.send({ token: JwtToken });
      }
    );
  } catch (err) {
    res.send("Login error");
  }
};

// TODO GET /me => restituisce l'utente collegato al token di accesso
export const GetMe = async (req, res) => {
  try {
    console.log("controllers => auth.controller.js - GetMe");
    /** prendo i dati dell'autore dall'headers */
    const Author = req.LoggedAuthor;
    /** se i dati non ci sono allora l'autore non è loggato */
    if (!Author) return res.status(401).send("Please login, you aren't logged");
    /** restituisco i dati dell'autore */
    return res.send(Author);
  } catch (err) {
    res.send("GetMe error");
  }
};
// TODO POST /register registrazione autore
export const PostRegister = async (req, res) => {
  try {
    console.log("controllers => auth.controller.js - PostRegister");
    // ??? la traccia dice di modificare la post dell'author che si trova nel controlle author. la devo spostare completamente qui?
  } catch (err) {
    res.send("PostRegister error");
  }
};
// TODO POST /logout logout autore (per JWT base non serve backend, basta togliere il token dal localStorage)
export const PostLogout = async (req, res) => {
  try {
    console.log("controllers => auth.controller.js - PostLogout");
  } catch (err) {
    res.send("PostLogout error");
  }
};

// TODO - GET login Google
export const GetLoginGoogle = async (req, res) => {};
// TODO - GET callback Google
export const GetCallbackGoogle = async (req, res) => {
  console.log("controllers => auth.controller.js - GetCallbackGoogle");
  /** qui facciamo il redirect al frontend passandogli nella query string il jwt creato in passport che l'ha aggiunto in req.author */
  res.redirect(`${process.env.FRONTEND_URL}?token=${req.user.JwtToken}`);
};
