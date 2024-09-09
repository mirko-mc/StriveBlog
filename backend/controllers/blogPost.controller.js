import PostsSchema from "../models/PostsSchema.js";
import crypto from "crypto";

/** GET /blogPosts => ritorna una lista di blog post */
export const GetBlogPosts = async (req, res) => {
  try {
    const totalResults = await PostsSchema.countDocuments();
    const PAGE = req.query.page || 1;
    const PERPAGE = req.query.perPage || 6;
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
      .limit(PERPAGE)
      .populate("author");
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
};

/** GET /blogPosts/:blogPostId => ritorna un singolo blog post */
export const GetBlogPost = async (req, res) => {
  try {
    const SingleBlogPost = await PostsSchema.findById(req.params.blogPostId);
    !SingleBlogPost
      ? res.status(404).send({ code: 404, message: "Post not found" })
      : res.send(SingleBlogPost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/** POST /blogPosts => crea un nuovo blog post */
export const PostBlogPost = async (req, res) => {
  try {
    console.log(req.body);
    !req.body.category &&
      res.status(400).send({ message: "Category is required" });
    !req.body.title && res.status(400).send({ message: "Title is required" });
    !req.body.content &&
      res.status(400).send({ message: "Content is required" });
    const NewBlogPost = new PostsSchema({
      /** creiamo un nuovo oggetto con tutte le chiavi di req.body + la chiave loggedAuthor */
      ...req.body,
      /** non prendo l'autore dal frontend ma lo prendo dalla req che ho impostato */
      author: req.LoggedAuthor._id,
    });
    const CreatedBlogPost = await NewBlogPost.save();
    res.status(201).send(CreatedBlogPost);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

/** PUT /blogPosts/:blogPostId => modifica il blog post con l'id associato */
export const PutBlogPost = async (req, res) => {
  try {
    const EditBlogPost = await PostsSchema.findByIdAndUpdate(
      req.params.blogPostId,
      req.body,
      { new: true }
    );
    res.send(EditBlogPost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/** DELETE /blogPosts/:blogPostId => cancella il blog post con l'id associato */
export const DeleteBlogPost = async (req, res) => {
  try {
    await PostsSchema.findByIdAndDelete(req.params.blogPostId);
    res.send({ message: "BlogPost deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/** PATCH /blogPosts/:blogPostId/cover, carica un'immagine per il post specificato dall'id. Salva l'URL creato da Cloudinary nel post corrispondente. */
export const PatchCoverBlogPost = async (req, res) => {
  try {
    await PostsSchema.findByIdAndUpdate(req.params.blogPostId, {
      cover: req.file.path,
    });
    res.send({ message: "cover updated" });
  } catch (err) {
    console.log(err);
  }
};

/** GET /blogPosts/:blogPostId/comments => ritorna tutti commenti di uno specifico post */
export const GetBlogPostAllComments = async (req, res) => {
  try {
    // * recupera blogPost tramite id
    const BlogPost = await PostsSchema.findById(req.params.blogPostId);

    // * invia i commenti all'utente
    res.send(BlogPost.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send({ messaggio: "server error" });
  }
};

/** GET /blogPosts/:blogPostId/comments/:commentId => ritorna un commento specifico di un post specifico */
export const GetBlogPostComment = async (req, res) => {
  try {
    const BlogPost = await PostsSchema.findById(req.params.blogPostId);
    const BlogPostComment = BlogPost.comments.id(req.params.commentId);
    res.send(BlogPostComment);
  } catch (err) {
    console.log(err);
    res.send({ message: "errore" });
  }
};

/** POST /blogPosts/:blogPostId => aggiungi un nuovo commento ad un post specifico */
export const PostBlogPostComment = async (req, res) => {
  console.log("CONTROLLLER => blogPost.controller.js - PostBlogPostComment");
  try {
    const BlogPost = await PostsSchema.findById(req.params.blogPostId);
    const commentId = crypto.randomBytes(16).toString("hex");
    console.log(commentId);
    BlogPost.comments.push({ ...req.body, id: commentId });
    await BlogPost.save();
    res.send({ message: "Added Comment" });
  } catch (err) {
    console.error(err);
    res.send({ message: "error" });
  }
};

/** PUT /blogPosts/:blogPostId/comment/:commentId => cambia un commento di un post specifico */
export const PutBlogPostComment = async (req, res) => {
  try {
    const BlogPost = await PostsSchema.findById(req.params.blogPostId);
    // .select("comments");
    // BlogPost.updateOne(
    //   { _id: req.params.commentId },
    //   { content: req.body.content }
    // );

    // BlogPost.updateOne(
    //   {
    //     "comments._id": req.params.commentId,
    //   },
    //   { $set: { content: req.body.content } },
    //   { arrayFilters: [{ _id: "req.params.commentId" }] }
    // );
    // BlogPost.save();

    const BlogPostComment = BlogPost.comments.id(req.params.commentId);
    BlogPostComment.content = req.body.content;
    await BlogPost.save();
    console.log(
      BlogPost.comments.findIndex((Item) => Item.id === req.params.commentId)
    );
    res.send({ message: "Edited comment" });
  } catch (err) {
    console.log(err);
    res.send({ message: "There is an error" });
  }
};

/** DELETE /blogPosts/:blogPostId/comment/:commentId => elimina un commento specifico da un post specifico. */
export const DeleteBlogPostComment = async (req, res) => {
  try {
    const BlogPost = await PostsSchema.findById(req.params.blogPostId);
    const BlogPostComment = BlogPost.comments.id(req.params.commentId);
    BlogPostComment.deleteOne();
    await BlogPost.save();
    res.send({ message: "Deleted comment" });
  } catch (err) {
    console.log(err);
    res.send({ message: "There is an error" });
  }
};
