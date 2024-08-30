import express from "express";
import uploadCloudinary from "../middlewares/uploads.js";
import * as AuthorController from "../controllers/author.controller.js";

const Router = express.Router();
/** GET /authors => ritorna la lista degli autori */
Router.get("/", AuthorController.GetAuthors);

/** GET /authors/:authorId => ritorna il singolo autore */
Router.get("/:authorId", AuthorController.GetAuthor);

/** POST /authors => crea un nuovo autore */
Router.post("/", AuthorController.PostAuthor);

/** PUT /authors/:authorId => modifica l'autore con l'id associato */
Router.put("/:authorId", AuthorController.PutAuthor);

/** DELETE /authors/:authorId => cancella l'autore con l'id associato */
Router.delete("/:authorId", AuthorController.DeleteAuthor);

/** GET /authors/:authorId/blogPosts/ => ricevi tutti i blog post di uno specifico autore dal corrispondente ID */
Router.get("/:authorId/blogPosts/", AuthorController.GetBlogPostsAuthor);

/** PATCH /authors/:authorId/avatar, carica un'immagine per l'autore specificato e salva l'URL creata da Cloudinary nel database. */
Router.patch(
  "/:authorId/avatar",
  uploadCloudinary.single("avatar"),
  AuthorController.PatchAuthorAvatar
);

export default Router;
