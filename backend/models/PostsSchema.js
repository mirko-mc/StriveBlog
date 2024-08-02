import { model, Schema } from "mongoose";

const posts = new Schema(
  {
    // categoria del post,
    category: {
      type: String,
      required: true,
    },
    // titolo del post,
    title: {
      type: String,
      required: true,
    },
    // link dell'immagine,
    cover: String,
    readTime: {
      // numero,
      value: Number,
      // unità di misura
      unit: String,
    },
    // email dell'autore del post,
    author: String,
    // HTML dell'articolo
    content: String,
  },
  { collection: "posts" }
);
export default model("Post", posts);
