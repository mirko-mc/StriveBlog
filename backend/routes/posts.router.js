import express from "express";
import uploadCloudinary from "../middlewares/uploads.js";
import * as BlogPostsController from "../controllers/blogPost.controller.js";
import { Authorization } from "../middlewares/authorization.js";

const Router = express.Router();

/** STRIVE BLOG - ROTTE */
/** GET /blogPosts => ritorna una lista di blog post */
Router.get("/", BlogPostsController.GetBlogPosts);

/** GET /blogPosts/:blogPostId => ritorna un singolo blog post */
Router.get("/:blogPostId", BlogPostsController.GetBlogPost);

/** POST /blogPosts => crea un nuovo blog post */
Router.post("/", BlogPostsController.PostBlogPost);

/** PUT /blogPosts/:blogPostId => modifica il blog post con l'id associato */
Router.put("/:blogPostId", BlogPostsController.PutBlogPost);

/** DELETE /blogPosts/:blogPostId => cancella il blog post con l'id associato */
Router.delete("/:blogPostId", BlogPostsController.DeleteBlogPost);

/** PATCH /blogPosts/:blogPostId/cover, carica un'immagine per il post specificato dall'id. Salva l'URL creato da Cloudinary nel post corrispondente. */
Router.patch(
  "/:blogPostId/cover",
  uploadCloudinary.single("cover"),
  BlogPostsController.PatchCoverBlogPost
);

/**
 * TODO GET /blogPosts/:blogPostId/comments => ritorna tutti commenti di uno specifico post
 * */
Router.get("/:blogPostId/comments", BlogPostsController.GetBlogPostAllComments);

/**
 * TODO GET /blogPosts/:blogPostId/comments/:commentId => ritorna un commento specifico di un post specifico
 */
Router.get(
  "/:blogPostId/comments/:commentId",
  BlogPostsController.GetBlogPostComment
);

/**
 * TODO POST /blogPosts/:blogPostId => aggiungi un nuovo commento ad un post specifico
 */
Router.post("/:blogPostId", BlogPostsController.PostBlogPostComment);

/**
 * TODO PUT /blogPosts/:blogPostId/comment/:commentId => cambia un commento di un post specifico
 */
Router.put(
  "/:blogPostId/comment/:commentId",
  BlogPostsController.PutBlogPostComment
);

/**
 * TODO DELETE /blogPosts/:blogPostId/comment/:commentId => elimina un commento specifico da un post specifico.
 */
Router.delete(
  "/:blogPostId/comment/:commentId",
  BlogPostsController.DeleteBlogPostComment
);

export default Router;
