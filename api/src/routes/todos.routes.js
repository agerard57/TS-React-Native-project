const todosController = require("../controllers/todos.controller");
const manageImages = require("../middlewares/manageImages");

module.exports = function (app) {
  // GET all todos / POST new todo
  app
    .route("/todos")
    .get(todosController.getAll)
    .post([manageImages.addImage], todosController.add);

  // GET todo by id / PUT to update a todo by id / DELETE todo by id
  app
    .route("/todo/:id([0-9a-f]{24})")
    .get(todosController.getOne)
    .put([manageImages.updateImage], todosController.update)
    .delete([manageImages.deleteImage], todosController.delete);

  // PUT to update a todo's favorite status by id
  app.route("/todo/fav/:id([0-9a-f]{24})").put(todosController.updateFavorite);
};
