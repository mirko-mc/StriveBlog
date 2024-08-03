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
      unique: true,
    },
    // link dell'immagine,
    cover: String,
    readTime: {
      // numero,
      value: Number,
      // unità di misura
      unit: String,
    },
    // id dell'autore del post,
    author: {
      type: String,
      unique: true,
    },
    // HTML dell'articolo
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "posts" }
);
export default model("Post", posts);
