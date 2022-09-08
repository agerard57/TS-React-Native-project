const mongoose = require("mongoose");

const TodosSchema = mongoose.Schema(
  {
    id: { type: Number, default: Date.now }, // Date.now as id is a clever way to see unique identifiers
    title: { type: String, required: true },
    description: { type: String, required: true },
    list: {
      type: String,
      required: true,
      default: "todo",
      set: (list) => list.toUpperCase(),
    },
    fav: { type: Boolean, default: false },
    author: { type: String, default: "Unknown" },
  },
  { toJSON: { getters: true } }
);

TodosSchema.index({ id: 1 }, { unique: true });

const TodosModel = mongoose.model("todos", TodosSchema);

module.exports = TodosModel;
