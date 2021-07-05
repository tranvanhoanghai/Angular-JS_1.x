const indexController = require("../app/controllers/test");
const userRouter = require("./users");

/* GET home page. */
// router.get('/', index.get);

function route(app) {
  app.get("/:id", indexController.getById);
  app.get("/", indexController.get);
  app.post("/", indexController.add);
  app.put("/:id", indexController.update);
  app.delete("/:id", indexController.delete);

  app.use("/users", userRouter);
}

module.exports = route;
