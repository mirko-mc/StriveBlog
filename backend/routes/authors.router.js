import express from "express";
import AuthorsSchema from "../models/AutorsSchema.js";
import PostsSchema from "../models/PostsSchema.js";

const ROUTER = express.Router();
/** GET /authors => ritorna la lista degli autori */
ROUTER.get("/", async (req, res) => {
  try {
    /** recuperiamo il numero di pagina e il numero di post per pagina */
    /** calcoliamo il numero totale di risultati */
    const totalResults = await AuthorsSchema.countDocuments();
    const page = req.query.page || 1;
    const perPage = req.query.perPage || totalResults;
    /** calcoliamo il numero totale di pagine */
    const totalPages = Math.ceil(totalResults / perPage);
    const AllAuthors = await AuthorsSchema.find()
      /** li ordiniamo per crescente di nome e poi cognome decrescente */
      // .sort({ name: 1, surname: -1 })
      /** saltiamo le pagine per restituire la pagina richiesta dall'utente */
      .skip((page - 1) * perPage)
      /** limitiamo il numero di post per pagina */
      .limit(perPage);

    /** all'utente inviamo un oggetto contenente:
     *  - la lista degli autori
     *  - il numero totale di risultati
     *  - il numero totale di pagine
     *  - la pagina richiesta
     */
    res.send({
      data: AllAuthors,
      totalResults,
      totalPages,
      page,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** GET /authors/123 => ritorna il singolo autore */
ROUTER.get("/:id", async (req, res) => {
  try {
    const SingleAuthor = await AuthorsSchema.findById(req.params.id);
    !SingleAuthor
      ? res.status(404).send({ code: 404, message: "Author not found" })
      : res.send(SingleAuthor);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** POST /authors => crea un nuovo autore */
ROUTER.post("/", async (req, res) => {
  try {
    if (await AuthorsSchema.exists({ email: req.body.email }))
      res.status(400).send({ message: "Email already exists" });
    !req.body.name && res.status(400).send({ message: "Name is required" });
    !req.body.surname &&
      res.status(400).send({ message: "Surname is required" });
    !req.body.email && res.status(400).send({ message: "Email is required" });
    /** crea nuova istanza del modello autore con i dati definiti nelle tonde (li prende dal body)*/
    const NewAuthor = new AuthorsSchema(req.body);

    /** procedura estesa per campi statici */
    // const PostNewAuthor = new AuthorsSchema({
    //   name: req.body.name,
    //   surname: req.body.surname,
    //   email: req.body.email,
    // });
    /**  aggiunge valore di default se l'utente non ha valorizzato un campo */
    // const PostNewAuthor = new AuthorsSchema({
    //   ...req.body,
    //   avatar: "test",
    // });

    /** salva i dati nel db prendendoli dall'istanza del modello */
    await NewAuthor.save();
    /** invia i dati salvati all'utente */
    res.status(201).send(NewAuthor);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/** PUT /authors/123 => modifica l'autore con l'id associato */
ROUTER.put("/:id", async (req, res) => {
  try {
    if (
      req.body.email &&
      (await AuthorsSchema.exists({ email: req.body.email }))
    )
      res.status(400).send({ message: "Email already exists" });
    const EditAuthor = await AuthorsSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    //??? è necessario salvare?
    await EditAuthor.save();
    res.send(EditAuthor);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** DELETE /authors/123 => cancella l'autore con l'id associato */
ROUTER.delete("/:id", async (req, res) => {
  try {
    await AuthorsSchema.findByIdAndDelete(req.params.id);
    res.send({ message: "Author deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** GET /authors/:id/blogPosts/ => ricevi tutti i blog post di uno specifico autore dal corrispondente ID */
ROUTER.get("/:id/blogPosts/", async (req, res) => {
  try {
    const totalResults = await PostsSchema.countDocuments();
    const PAGE = req.query.page || 1;
    const PERPAGE = req.query.perPage || totalResults;
    const totalPages = Math.ceil(totalResults / PERPAGE);
    const AuthorAllBlogPosts = await PostsSchema.find({ author: req.params.id })
      // .sort({ name: 1 })
      .skip((PAGE - 1) * PERPAGE)
      .limit(PERPAGE);
    res.send({
      data: AuthorAllBlogPosts,
      totalResults,
      totalPages,
      page: PAGE,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default ROUTER;
