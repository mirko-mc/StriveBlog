import express from "express";
import AuthorsSchema from "../models/AutorsSchema.js";
import PostsSchema from "../models/PostsSchema.js";

const Router = express.Router();
/** GET /authors => ritorna la lista degli autori */
Router.get("/", async (req, res) => {
  try {
    /** recuperiamo il numero di pagina e il numero di post per pagina */
    /** calcoliamo il numero totale di risultati */
    const totalResults = await AuthorsSchema.countDocuments();
    const page = req.query.page || 1;
    let perPage = req.query.perPage || totalResults;
    perPage = perPage > 5 ? 5 : perPage;
    /** calcoliamo il numero totale di pagine */
    const totalPages = Math.ceil(totalResults / perPage);
    const AllAuthors = await AuthorsSchema.find()
      // db.getCollection('users').find({}).collation({locale: "en"}).sort({name:1})
      .collation({ locale: "it" })
      /** li ordiniamo per crescente di nome e poi cognome decrescente */
      .sort({ name: 1, surname: 1 })
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
Router.get("/:id", async (req, res) => {
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
Router.post("/", async (req, res) => {
  try {
    if (await AuthorsSchema.exists({ email: req.body.email }))
      throw new Error("Email already exists");
    // return res.status(400).send({ message: "Email already exists" });

    if (!req.body.name) throw new Error("Name is required");
    // return res.status(400).send({ message: "Name is required" });

    if (!req.body.surname) throw new Error("Surname is required");
    // res.status(400).send({ message: "Surname is required" });

    if (!req.body.email) throw new Error("Email is required");
    // && res.status(400).send({ message: "Email is required" });
    /** crea nuova istanza del modello autore con i dati definiti nelle tonde (li prende dal body)*/
    const NewAuthor = new AuthorsSchema(req.body);
    /** ci assicuriamo che l'utente abbia inserito un avatar altrimenti ne impostiamo uno di default */
    NewAuthor.avatar = NewAuthor.avatar
      ? NewAuthor.avatar
      : "https://njhalloffame.org/wp-content/uploads/2021/04/generic-avatar-300x300.png";
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
    res.status(400).send({ message: err.message });
  }
});

/** PUT /authors/123 => modifica l'autore con l'id associato */
Router.put("/:id", async (req, res) => {
  try {
    if (
      req.body.email &&
      (await AuthorsSchema.exists({ email: req.body.email }))
    )
      throw new Error("Email already exists");
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
    res.status(400).send({ message: err.message });
  }
});

/** DELETE /authors/123 => cancella l'autore con l'id associato */
Router.delete("/:id", async (req, res) => {
  try {
    await AuthorsSchema.findByIdAndDelete(req.params.id);
    res.send({ message: "Author deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** GET /authors/:id/blogPosts/ => ricevi tutti i blog post di uno specifico autore dal corrispondente ID */
Router.get("/:id/blogPosts/", async (req, res) => {
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

/** PATCH /authors/:authorId/avatar, carica un'immagine per l'autore specificato e salva l'URL creata da Cloudinary nel database. */
Router.patch("/authors/:authorId/avatar", (req, res) => {
  /**
   * prendere l'immagine dell'utente e caricarla su Cloudinary
   * prendere il path dell'immagine e salvarlo nel database alla voce avatar
   */
});

export default Router;
