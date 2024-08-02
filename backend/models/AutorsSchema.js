import { model, Schema } from "mongoose";
/** new Schema({},{}) vuole 2 oggetti:
 *  1. schema (struttura dei dati)
 *  2. collection (nome della collection in mongo)
 */
const authors = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthDate: {
      type: Date,
    },
    avatar: {
      type: String,
    },
  },
  /** naming convention: la collection plurale */
  { collection: "authors" }
);
/** naming convention: il model singolare */
export default model("Author", authors);
