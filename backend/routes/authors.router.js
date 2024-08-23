import express from "express";
import uploadCloudinary from "../middlewares/uploads.js";
import * as AuthorController from "../controllers/author.controller.js";

const Router = express.Router();
/** GET /authors => ritorna la lista degli autori */
Router.get("/", AuthorController.GetAuthors);

/** GET /authors/123 => ritorna il singolo autore */
Router.get("/:id", AuthorController.GetAuthor);

/** POST /authors => crea un nuovo autore */
Router.post("/", AuthorController.PostAuthor);

/** PUT /authors/123 => modifica l'autore con l'id associato */
Router.put("/:id", AuthorController.PutAuthor);

/** DELETE /authors/123 => cancella l'autore con l'id associato */
Router.delete("/:id", AuthorController.DeleteAuthor);

/** GET /authors/:id/blogPosts/ => ricevi tutti i blog post di uno specifico autore dal corrispondente ID */
Router.get("/:id/blogPosts/", AuthorController.GetBlogPostsAuthor);

/** PATCH /authors/:authorId/avatar, carica un'immagine per l'autore specificato e salva l'URL creata da Cloudinary nel database. */
Router.patch(
  "/:id/avatar",
  uploadCloudinary.single("avatar"),
  AuthorController.PatchAuthorAvatar
);

export default Router;
