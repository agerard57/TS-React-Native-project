const TodosModel = require("../models/todos.model");
const path = require("path");

const todoOptions = (request) => {
  return {
    title: request.title,
    description: request.content,
    list: request.list,
    imageName: request.image.fileName,
    author: request.author,
  };
};

// //////////////////
// Get all controller
exports.getAll = (_req, res) => {
  TodosModel.find().then((todos) => {
    res.json(todos);
  });
};

// //////////////////
// Get one controller
exports.getOne = (req, res) => {
  const id = req.params.id;

  TodosModel.findById(id)
    .lean()
    .then((todo) => {
      if (todo.imageName && todo.imageName !== "") {
        const image = require("fs").readFileSync(
          path.join(__dirname, `../../public/images/${todo.imageName}`)
        );
        todo.image = image.toString("base64");
        const ext = todo.imageName.split(".").pop();
        todo.image = {
          fileName: todo.imageName,
          file: `data:image/${ext};base64,${todo.image}`,
        };
        delete todo.imageName;
      }
      res.json(todo);
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

// //////////////////
// Add controller
exports.add = (req, res) => {
  const todo = new TodosModel(todoOptions(req.body));
  todo
    .save()
    .then((_message) => {
      res.json("Your todo has been added!");
    })
    .catch((_error) => {
      res.status(500).json("An error occurred!");
    });
};

// //////////////////
// Update controller
exports.update = (req, res) => {
  const findById = { _id: req.params.id };

  TodosModel.findOneAndReplace(findById, todoOptions(req.body), { new: true })
    .then((_message) => {
      res.json("Your todo has been updated!");
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

// //////////////////
// Delete controller
exports.delete = (req, res) => {
  const id = req.params.id;
  TodosModel.deleteOne({ _id: id }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "Deleted!",
    });
  });
};

// //////////////////
// Update favorite controller
exports.updateFavorite = (req, res) => {
  const id = req.params.id;
  TodosModel.findById(id).then((todo) => {
    todo.fav = !todo.fav;
    todo.save();
    res.json("Your todo has been updated!");
  });
};
