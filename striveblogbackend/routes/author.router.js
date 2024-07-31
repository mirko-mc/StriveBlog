import express from "express";
import Author from "../models/AutorsSchema.js";

const ROUTER = express.Router();
/** GET /authors => ritorna la lista degli autori */
ROUTER.get("/", (req, res) => {
  const authors = [
    {
      _id: "123",
      name: "Luca",
      surname: "Cecchini",
      email: "0vQ7k@example.com",
      birthDate: "01/01/2000",
      avatar: "https://i.ytimg.com/vi/2aZwQs5n9pE/maxresdefault.jpg",
    },
    {
      _id: "456",
      name: "Marco",
      surname: "Cecchini",
      email: "0vQ7k@example.com",
      birthDate: "01/01/2000",
      avatar: "https://i.ytimg.com/vi/2aZwQs5n9pE/maxresdefault.jpg",
    },
  ];
  res.send(authors);
}) -
  /** GET /authors/123 => ritorna il singolo autore */
  ROUTER.get("/:id", (req, res) => {
    const { id } = req.params;
    res.send(`${id} è l'id dell'autore`);
  });
/** POST /authors => crea un nuovo autore */
ROUTER.post("/", async (req, res) => {
  /** crea nuova istanza del modello autore con i dati definiti nelle tonde (li prende dal body)*/
  // const author = new Author(req.body);

  /** procedura estesa per campi statici */
  // const author = new Author({
  //   name: req.body.name,
  //   surname: req.body.surname,
  //   email: req.body.email,
  // });
  const author = new Author({
    ...req.body,
    avatar: "test",
  });

  /** salva i dati nel db prendendoli dall'istanza del modello */
  await author.save();
  /** invia i dati al database */
  res.send(author);
});
/** PUT /authors/123 => modifica l'autore con l'id associato */
ROUTER.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`modifica l'autore con l'id ${id}`);
});
/** DELETE /authors/123 => cancella l'autore con l'id associato */
ROUTER.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`cancella l'autore con l'id ${id}`);
});

export default ROUTER;
