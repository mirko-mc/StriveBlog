import AuthorsSchema from "../models/AuthorsSchema.js";
import PostsSchema from "../models/PostsSchema.js";
import EmailTransport from "../services/email.service.js";
import Bcrypt from "bcrypt";

/** GET /authors => ritorna la lista degli autori */
export const GetAuthors = async (req, res) => {
  try {
    /** recuperiamo il numero di pagina e il numero di post per pagina */
    /** calcoliamo il numero totale di risultati */
    const totalResults = await AuthorsSchema.countDocuments();
    const page = req.query.page || 1;
    let perPage = req.query.perPage || totalResults;
    perPage = perPage > 6 ? 6 : perPage;
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
};

/** GET /authors/:authorId => ritorna il singolo autore */
export const GetAuthor = async (req, res) => {
  try {
    const SingleAuthor = await AuthorsSchema.findById(req.params.authorId);
    !SingleAuthor
      ? res.status(404).send({ code: 404, message: "Author not found" })
      : res.send(SingleAuthor);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/** POST /authors => crea un nuovo autore */
// TODO modifica POST /authors => deve creare un nuovo utente con password criptata
export const PostAuthor = async (req, res) => {
  try {
    console.log("controllers => author.controller.js - PostAuthor");
    /** controllo che la mail non sia già presente nel database */
    if (await AuthorsSchema.exists({ email: req.body.email }))
      throw new Error("Email already exists");
    /** controllo che i campi obbligatori siano stati valorizzati */
    if (!req.body.name) throw new Error("Name is required");
    if (!req.body.surname) throw new Error("Surname is required");
    if (!req.body.email) throw new Error("Email is required");
    if (!req.body.password) throw new Error("Password is required");
    /** crea nuova istanza del modello autore con i dati definiti nel body o, meglio ancora, glieli passo manualmente uno ad uno per evitare che provengano dati indesiderati */
    const NewAuthor = new AuthorsSchema({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      /** hasho la password  */
      password: await Bcrypt.hash(req.body.password, 10),
      birthDate: req.body.birthDate,
      avatar: req.body.avatar,
    });
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
    PostSendMail(NewAuthor.email, NewAuthor.name).then((result) => {
      if (!result) throw new Error("Email not sent");
    });
    /** invia i dati salvati all'utente */
    res.status(201).send(NewAuthor);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

const PostSendMail = async (email, name) => {
  try {
    await EmailTransport.sendMail({
      /** chi manda la mail */
      from: "pelato@scoppiato.boom",
      /** chi riceve la mail */
      to: email,
      /** oggetto mail */
      subject: "Prova Scoppiata",
      /** testo mail */
      text: `Buona scoppiatudine ${name}`,
      /** html mail */
      html: `<b>Buona scoppiatudine ${name}</b>`,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/** PUT /authors/:authorId => modifica l'autore con l'id associato */
export const PutAuthor = async (req, res) => {
  try {
    /** modifica l'autore con l'id associato */
    const EditAuthor = await AuthorsSchema.findByIdAndUpdate(
      req.params.authorId,
      req.body,
      { new: true }
    );
    res.send(EditAuthor);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

/** DELETE /authors/:authorId => cancella l'autore con l'id associato */
export const DeleteAuthor = async (req, res) => {
  try {
    await AuthorsSchema.findByIdAndDelete(req.params.authorId);
    res.send({ message: "Author deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/** GET /authors/:authorId/blogPosts/ => ricevi tutti i blog post di uno specifico autore dal corrispondente ID */
export const GetBlogPostsAuthor = async (req, res) => {
  try {
    const totalResults = await PostsSchema.countDocuments();
    const PAGE = req.query.page || 1;
    const PERPAGE = req.query.perPage || totalResults;
    const totalPages = Math.ceil(totalResults / PERPAGE);
    const AuthorAllBlogPosts = await PostsSchema.find({
      author: req.params.authorId,
    })
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
};

/** PATCH /authors/:authorId/avatar, carica un'immagine per l'autore specificato e salva l'URL creata da Cloudinary nel database. */
export const PatchAuthorAvatar = async (req, res) => {
  try {
    await AuthorsSchema.findByIdAndUpdate(req.params.authorId, {
      avatar: req.file.path,
    });
    res.send({ message: "avatar updated" });
  } catch (err) {
    console.log(err);
  }
};
