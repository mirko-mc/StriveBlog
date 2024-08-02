import express from "express";
import PostsSchema from "../models/PostsSchema.js";

const ROUTER = express.Router();

/** STRIVE BLOG - ROTTE */
/** GET /blogPosts => ritorna una lista di blog post */
ROUTER.get("/", async (req, res) => {
  const PAGE = req.query.page || 1;
  const PERPAGE = req.query.perPage || 5;
  /** GET /blogPosts?title=whatever => filtra i blog post e ricevi l'unico che corrisponda alla condizione di ricerca (es: titolo contiene "whatever") */
  const TITLE = req.query.title;
  try {
    if (TITLE) {
      const POSTBLOG = await PostsSchema.findOne({
        title: { $regex: TITLE, $options: "i" },
      });
      res.send(POSTBLOG);
    } else {
      const POSTSBLOG = await PostsSchema.find()
        .sort({ name: 1 })
        .skip((PAGE - 1) * PERPAGE)
        .limit(PERPAGE);
      const totalResults = await PostsSchema.countDocuments();
      const totalPages = Math.ceil(totalResults / PERPAGE);
      res.send({
        data: POSTSBLOG,
        totalResults,
        totalPages,
        page: PAGE,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
/** GET /blogPosts/123 => ritorna un singolo blog post */
ROUTER.get("/:id", async (req, res) => {
  const POSTBLOG = await PostsSchema.findById(req.params.id);
  res.send(POSTBLOG);
});
/** POST /blogPosts => crea un nuovo blog post */
ROUTER.post("/", async (req, res) => {
  const POSTBLOG = new PostsSchema(req.body);
  try {
    await POSTBLOG.save();
    res.status(201).send(POSTBLOG);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "qualcosa è andato storto, controlla i dati e riprova",
    });
  }
});
/** PUT /blogPosts/123 => modifica il blog post con l'id associato */
ROUTER.put("/:id", async (req, res) => {
  try {
    const POSTBLOG = await PostsSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    await POSTBLOG.save();
    res.send(POSTBLOG);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "qualcosa è andato storto, controlla i dati e riprova",
    });
  }
});
/** DELETE /blogPosts/123 => cancella il blog post con l'id associato */
ROUTER.delete("/:id", async (req, res) => {
  await PostsSchema.findByIdAndDelete(req.params.id);
  res.send(`cancellato il postblog con l'id ${req.params.id}`);
});

/** STRIVE BLOG - EXTRA (facoltativi, per ora) */
/** Fare la POST di un articolo dal form di aggiunta articolo */
/** Fare la fetch degli articoli presenti nel database e visualizzarli nella homepage */
/** Aggiungi la funzionalità di ricerca dei post nel frontend */

export default ROUTER;
