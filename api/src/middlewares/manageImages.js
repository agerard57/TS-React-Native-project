const TodosModel = require("../models/todos.model");
const path = require("path");

const addImage = (req, _res, next) => {
  if (req.body.image.file !== "") {
    const base64Data = req.body.image.file.replace(
      /^data:([A-Za-z-+/]+);base64,/,
      ""
    );

    const fileName = req.body.image.fileName;
    const filePath = path.join(__dirname, `../../public/images/${fileName}`);
    require("fs").writeFile(filePath, base64Data, "base64", (err) => {
      if (err) {
        console.error(err);
      } else next();
    });
  } else next();
};

const updateImage = (req, _res, next) => {
  const { fileName, file } = req.body.image;
  const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, "");
  const filePath = (fileName) =>
    path.join(__dirname, `../../public/images/${fileName}`);

  TodosModel.findById(req.params.id).then((todo) => {
    // Check if todo already has an image
    if (todo.imageName && todo.imageName !== "") {
      // Is the image the same?
      if (todo.imageName === fileName) {
        next();
      }
      // If not, update the image
      if (fileName !== "") {
        require("fs").writeFile(
          filePath(fileName),
          base64Data,
          "base64",
          (err) => {
            if (err) {
              console.error(err);
            } else next();
          }
        );
        // If the new image is empty, delete the old image
      } else {
        require("fs").unlink(filePath(todo.imageName), (err) => {
          if (err) {
            console.error(err);
          } else next();
        });
      }
      // If the todo doesn't have an image, add one
    } else {
      // If the new image is not empty, add it
      if (fileName !== "") {
        require("fs").writeFile(
          filePath(fileName),
          base64Data,
          "base64",
          (err) => {
            if (err) {
              console.error(err);
            } else next();
          }
        );
        // If the new image is empty, do nothing
      } else next();
    }
  });
};

const deleteImage = (req, _res, next) => {
  TodosModel.findById(req.params.id).then((todo) => {
    if (todo.imageName && todo.imageName !== "") {
      const filePath = path.join(
        __dirname,
        `../../public/images/${todo.imageName}`
      );
      require("fs").unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        } else next();
      });
    } else next();
  });
};

const manageImages = {
  addImage,
  updateImage,
  deleteImage,
};

module.exports = manageImages;
