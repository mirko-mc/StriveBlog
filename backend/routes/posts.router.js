import express from "express";
import PostsSchema from "../models/PostsSchema.js";
import uploadCloudinary from "../middlewares/uploads.js";
import { ChangeCover } from "../controllers/blogPost.controller.js";

const Router = express.Router();

/** STRIVE BLOG - ROTTE */
/** GET /blogPosts => ritorna una lista di blog post */
Router.get("/", async (req, res) => {
  try {
    const totalResults = await PostsSchema.countDocuments();
    const PAGE = req.query.page || 1;
    const PERPAGE = req.query.perPage || totalResults;
    const totalPages = Math.ceil(totalResults / PERPAGE);
    /** GET /blogPosts?title=whatever => filtra i blog post e ricevi l'unico che corrisponda alla condizione di ricerca (es: titolo contiene "whatever") */
    const TITLE = req.query.title;
    // if (TITLE) {
    //   const BlogPostsQueryTitle = await PostsSchema.findOne({
    //     title: { $regex: TITLE, $options: "i" },
    //   });
    //   res.send(BlogPostsQueryTitle);
    // } else {
    const AllBlogPosts = await PostsSchema.find(
      TITLE ? { title: { $regex: TITLE, $options: "i" } } : {}
    )
      // .sort({ name: 1 })
      .skip((PAGE - 1) * PERPAGE)
      .limit(PERPAGE);
    res.send({
      data: AllBlogPosts,
      totalResults,
      totalPages,
      page: PAGE,
    });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** GET /blogPosts/123 => ritorna un singolo blog post */
Router.get("/:id", async (req, res) => {
  try {
    const SingleBlogPost = await PostsSchema.findById(req.params.id);
    !SingleBlogPost
      ? res.status(404).send({ code: 404, message: "Post not found" })
      : res.send(SingleBlogPost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** POST /blogPosts => crea un nuovo blog post */
Router.post("/", async (req, res) => {
  try {
    !req.body.category &&
      res.status(400).send({ message: "Category is required" });
    !req.body.title && res.status(400).send({ message: "Title is required" });
    !req.body.content &&
      res.status(400).send({ message: "Content is required" });
    const NewBlogPost = new PostsSchema(req.body);
    const CreatedBlogPost = await NewBlogPost.save();
    res.status(201).send(CreatedBlogPost);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/** PUT /blogPosts/123 => modifica il blog post con l'id associato */
Router.put("/:id", async (req, res) => {
  try {
    const EditBlogPost = await PostsSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    //??? è necessario salvare?
    await EditBlogPost.save();
    res.send(EditBlogPost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** DELETE /blogPosts/123 => cancella il blog post con l'id associato */
Router.delete("/:id", async (req, res) => {
  try {
    await PostsSchema.findByIdAndDelete(req.params.id);
    res.send({ message: "BlogPost deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** PATCH /blogPosts/:blogPostId/cover, carica un'immagine per il post specificato dall'id. Salva l'URL creato da Cloudinary nel post corrispondente. */
Router.patch("/:id/cover", uploadCloudinary.single("cover"), ChangeCover);

export default Router;
