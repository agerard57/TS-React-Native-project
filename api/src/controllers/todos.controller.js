const TodosModel = require("../models/todos.model");

const todoOptions = (request) => {
  return {
    title: request.title,
    description: request.content,
    list: request.list,
    User: request.image.fileName,
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

  TodosModel.findById(id, (err, todo) => {
    if (err) res.send(err);
    res.json(todo);
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
      res.status(500);
      res.json("An error occured!");
    });
};

// //////////////////
// Update controller
exports.update = (req, res) => {
  const findById = { _id: req.params.id };

  TodosModel.findOneAndReplace(findById, todoOptions(req.body), { new: true })
    .then((message) => {
      res.json(message);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
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
