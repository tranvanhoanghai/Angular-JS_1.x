const indexController = require("../app/controllers/test.controller");
const userRouter = require("./users");
const authRouter = require("./auth");

/* GET home page. */
// router.get('/', index.get);

function route(app) {
  app.use("/auth/login", authRouter);

  app.use("/users", userRouter);

  app.get("/:id", indexController.getById);
  app.get("/", indexController.get);
  app.post("/", indexController.add);
  app.put("/:id", indexController.update);
  app.delete("/:id", indexController.delete);
}

module.exports = route;
