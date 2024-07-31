import express from "express";
import Author from "../models/AutorsSchema.js";

const ROUTER = express.Router();
/** GET /authors => ritorna la lista degli autori */
ROUTER.get("/", async (req, res) => {
  const author = await Author.find();
  res.send(author);
}) -
  /** GET /authors/123 => ritorna il singolo autore */
  ROUTER.get("/:id", async (req, res) => {
    const author = await Author.findById(req.params.id);
    res.send(author);
  });
/** POST /authors => crea un nuovo autore */
ROUTER.post("/", async (req, res) => {
  /** crea nuova istanza del modello autore con i dati definiti nelle tonde (li prende dal body)*/
  const author = new Author(req.body);

  /** procedura estesa per campi statici */
  // const author = new Author({
  //   name: req.body.name,
  //   surname: req.body.surname,
  //   email: req.body.email,
  // });
  /**  aggiunge valore di default se l'utente non ha valorizzato un campo */
  // const author = new Author({
  //   ...req.body,
  //   avatar: "test",
  // });

  /** salva i dati nel db prendendoli dall'istanza del modello */
  await author.save();
  /** invia i dati al database */
  res.send(author);
});
/** PUT /authors/123 => modifica l'autore con l'id associato */
ROUTER.put("/:id", async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body);
  await author.save();
  // res.send(`modificato l'autore con l'id ${id}`);
  res.send(author);
});
/** DELETE /authors/123 => cancella l'autore con l'id associato */
ROUTER.delete("/:id", async (req, res) => {
  await Author.findByIdAndDelete(req.params.id);
  res.send(`cancellato l'autore con l'id ${req.params.id}`);
});

export default ROUTER;
