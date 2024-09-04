import PassportGoogleStrategy from "passport-google-oauth20";
import AuthorsSchema from "../models/AuthorsSchema.js";
import Jwt from "jsonwebtoken";

console.log("config => passport.config.js - GoogleStrategy");
/** definisco la strategia google indicando le credenziali d'accesso e l'indirizzo della callbackGoogle */
const GoogleStrategy = new PassportGoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}/callback-google`,
  },

  async function (accessToken, refreshToken, profile, passportNext) {
    /** definiamo l'oggetto profilo che rispecchia il nostro schema */
    const {
      given_name: name,
      family_name: surname,
      email,
      sub: googleId,
    } = profile._json;

    /** dichiaro il nuovo autore come null perché lo definisco nell'if e lo riutilizzo nella firma del jwt senza andarmi a fetchare l'autore */
    let author = await AuthorsSchema.findOne({ googleId });
    /** se l'autore non esiste nel database allora lo creo */
    // if (!(await AuthorsSchema.exists({ googleId }))) {
    if (!author) {
      const NewAuthor = new AuthorsSchema({
        googleId,
        name,
        surname,
        email,
      });
      author = await NewAuthor.save();
      console.log(author);
      author = NewAuthor;
      console.log(author);
    }

    // TODO sarebbe bene centralizzare la funzione di creazione del jwt
    /** creiamo il JwtToken per l'utente */
    Jwt.sign(
      /** i dati che deve contenere */
      { author: author._id },
      /** il mio segreto */
      process.env.JWT_SECRET,
      /** la durata del token (solo numero sono secondi, stringa numero lettera sono tempi più lunghi (1h, 1m, 1M) */
      { expiresIn: "1h" },
      (err, JwtToken) => {
        /** in caso di errore chiudo la funzione col return */
        if (err) return res.status(401).send();
        /** richiamo il prossimo middleware di passport, NON di express */
        /** il primo argomento è l'eventuale errore, il secondo argomento è il valore che passport assegnerà a req.author e cioè un oggetto con la chiave token */
        return passportNext(null, { JwtToken });
      }
    );
  }
);
export default GoogleStrategy;
