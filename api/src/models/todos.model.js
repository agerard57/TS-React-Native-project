const mongoose = require("mongoose");

const TodosSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    list: {
      type: String,
      required: true,
      set: (list) => list.toUpperCase(),
    },
    fav: { type: Boolean, default: false },
    imageUrl: { type: String },
    author: { type: String, required: true },
  },
  { toJSON: { getters: true } }
);

TodosSchema.index({ id: 1 }, { unique: true });

const TodosModel = mongoose.model("todos", TodosSchema);

module.exports = TodosModel;
