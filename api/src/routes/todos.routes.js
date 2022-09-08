const todosController = require("../controllers/todos.controller");

module.exports = function (app) {
  // GET all todos / POST new todo
  app.route("/todos").get(todosController.getAll).post(todosController.add);

  // GET todo by id / PUT to update a todo by id / DELETE todo by id
  app
    .route("/todos/:id")
    .get(todosController.getOne)
    .put(todosController.update)
    .delete(todosController.delete);
};
