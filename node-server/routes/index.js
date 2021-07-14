const indexController = require("../app/controllers/test.controller");
const userRouter = require("./users");
const authRouter = require("./auth");
const contactRouter = require("./contact");
const salesOrderRouter = require("./salesOrder");
const dashboardRouter = require("./dashboard");

const auth = require("../app/controllers/auth.controller");

/* GET home page. */
// router.get('/', index.get);

function route(app) {
  app.use("/auth", authRouter);

  app.use("/user", auth.verifyToken, userRouter);
  app.use("/contact", auth.verifyToken, contactRouter);
  app.use("/sales-order", auth.verifyToken, salesOrderRouter);
  app.use("/dashboard", auth.verifyToken, dashboardRouter);

  app.get("/:id", indexController.getById);
  app.get("/", indexController.get);
  app.post("/", indexController.add);
  app.put("/:id", indexController.update);
  app.delete("/:id", indexController.delete);
}

module.exports = route;
