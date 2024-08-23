import PostsSchema from "../models/PostsSchema.js";

export const ChangeCover = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.file.path);
    await PostsSchema.findByIdAndUpdate(req.params.id, {
      cover: req.file.path,
    });
    res.send({ message: "cover updated" });
  } catch (err) {
    console.log(err);
  }
};
