import { model, Schema } from "mongoose";

const commentsSchema = new Schema(
  {
    content: {
      type: String,
      min: 10,
      max: 100,
      trim: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
    cover: {
      type: String,
      default: "https://picsum.photos/1000/300",
    },
    readTime: {
      // numero,
      value: Number,
      // unità di misura
      unit: String,
    },
    // id dell'autore del post,
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      // required: true,
    },
    // HTML dell'articolo
    content: {
      type: String,
      required: true,
    },
    comments: [commentsSchema],
  },
  { collection: "posts" }
);
export default model("Post", posts);
