const TodosModel = require("../models/todos.model");

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
  TodosModel.findOne({ _id: id }).then((todos) => {
    res.json(todos);
  });
};

// //////////////////
// Add controller
exports.add = (req, res) => {
  const addOptions = {
    title: req.body.title,
    description: req.body.content,
    list: req.body.list,
    image: req.body.image.fileName,
    author: req.body.author,
  };

  const todo = new TodosModel(addOptions);

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
  const updateOptions = {
    title: req.body.title,
    description: req.body.description,
    list: req.body.list,
    fav: req.body.fav,
    author: req.body.author,
  };
  const findById = { _id: req.params.id };

  TodosModel.findOneAndReplace(findById, updateOptions, { new: true })
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
