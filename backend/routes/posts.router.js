import express from "express";
import uploadCloudinary from "../middlewares/uploads.js";
import * as BlogPostsController from "../controllers/blogPost.controller.js";

const Router = express.Router();

/** STRIVE BLOG - ROTTE */
/** GET /blogPosts => ritorna una lista di blog post */
Router.get("/", BlogPostsController.GetBlogPosts);

/** GET /blogPosts/123 => ritorna un singolo blog post */
Router.get("/:id", BlogPostsController.GetBlogPost);

/** POST /blogPosts => crea un nuovo blog post */
Router.post("/", BlogPostsController.PostBlogPost);

/** PUT /blogPosts/123 => modifica il blog post con l'id associato */
Router.put("/:id", BlogPostsController.PutBlogPost);

/** DELETE /blogPosts/123 => cancella il blog post con l'id associato */
Router.delete("/:id", BlogPostsController.DeleteBlogPost);

/** PATCH /blogPosts/:blogPostId/cover, carica un'immagine per il post specificato dall'id. Salva l'URL creato da Cloudinary nel post corrispondente. */
Router.patch(
  "/:id/cover",
  uploadCloudinary.single("cover"),
  BlogPostsController.PatchCoverBlogPost
);

export default Router;
