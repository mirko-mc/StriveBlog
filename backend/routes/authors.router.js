import express from "express";
import AuthorSchema from "../models/AutorsSchema.js";

const ROUTER = express.Router();
/** GET /authors => ritorna la lista degli autori */
ROUTER.get("/", async (req, res) => {
  /** recuperiamo il numero di pagina e il numero di post per pagina */
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  const AUTHORS = await AuthorSchema.find()
    /** li ordiniamo per crescente di nome e poi cognome decrescente */
    .sort({ name: 1, surname: -1 })
    /** saltiamo le pagine per restituire la pagina richiesta dall'utente */
    .skip((page - 1) * perPage)
    /** limitiamo il numero di post per pagina */
    .limit(perPage);

  /** calcoliamo il numero totale di risultati */
  const totalResults = await AuthorSchema.countDocuments();
  /** calcoliamo il numero totale di pagine */
  const totalPages = Math.ceil(totalResults / perPage);
  /** all'uitente inviamo un oggetto contenente:
   *  - la lista degli autori
   *  - il numero totale di risultati
   *  - il numero totale di pagine
   *  - la pagina richiesta
   */
  res.send({
    data: AUTHORS,
    totalResults,
    totalPages,
    page,
  });
}) -
  /** GET /authors/123 => ritorna il singolo autore */
  ROUTER.get("/:id", async (req, res) => {
    const AUTHOR = await AuthorSchema.findById(req.params.id);
    res.send(AUTHOR);
  });
/** POST /authors => crea un nuovo autore */
ROUTER.post("/", async (req, res) => {
  /** crea nuova istanza del modello autore con i dati definiti nelle tonde (li prende dal body)*/
  const AUTHOR = new AuthorSchema(req.body);

  /** procedura estesa per campi statici */
  // const AUTHOR = new Authors({
  //   name: req.body.name,
  //   surname: req.body.surname,
  //   email: req.body.email,
  // });
  /**  aggiunge valore di default se l'utente non ha valorizzato un campo */
  // const AUTHOR = new Authors({
  //   ...req.body,
  //   avatar: "test",
  // });

  /** salva i dati nel db prendendoli dall'istanza del modello */
  await AUTHOR.save();
  /** invia i dati salvati all'utente */
  res.send(AUTHOR);
});
/** PUT /authors/123 => modifica l'autore con l'id associato */
ROUTER.put("/:id", async (req, res) => {
  const AUTHOR = await AuthorSchema.findByIdAndUpdate(req.params.id, req.body);
  await AUTHOR.save();
  res.send(AUTHOR);
});
/** DELETE /authors/123 => cancella l'autore con l'id associato */
ROUTER.delete("/:id", async (req, res) => {
  await AuthorSchema.findByIdAndDelete(req.params.id);
  res.send(`cancellato l'autore con l'id ${req.params.id}`);
});

export default ROUTER;
