const indexController = require("../app/controllers/test.controller");
const userRouter = require("./users");
const authRouter = require("./auth");
const contactRouter = require("./contact");
const salesOrderRouter = require("./salesOrder");

/* GET home page. */
// router.get('/', index.get);

function route(app) {
  app.use("/auth/login", authRouter);

  app.use("/user", userRouter);
  app.use("/contact", contactRouter);
  app.use("/sales-order", salesOrderRouter);

  app.get("/:id", indexController.getById);
  app.get("/", indexController.get);
  app.post("/", indexController.add);
  app.put("/:id", indexController.update);
  app.delete("/:id", indexController.delete);
}

module.exports = route;
