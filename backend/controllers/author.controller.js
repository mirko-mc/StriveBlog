import AutorsSchema from "../models/AutorsSchema.js";

export const ChangeAvatar = async (req, res) => {
  try {
    await AutorsSchema.findByIdAndUpdate(req.params.id, {
      avatar: req.file.path,
    });
    res.send({ message: "avatar updated" });
  } catch (err) {
    console.log(err);
  }
};
