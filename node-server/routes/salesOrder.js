const express = require("express");
const router = express.Router();
const salesOrderController = require("../app/controllers/salesOrder.controller");

router.get("/:id", salesOrderController.detailSalesOrder);
router.get("/", salesOrderController.getListSalesOrders);
router.get("/assign/:name", salesOrderController.getListSalesOrdersAssign);
router.post("/", salesOrderController.createdSalesOrder);
router.put("/:id", salesOrderController.updateSalesOrder);
router.delete("/:id", salesOrderController.deleteSalesOrder);

module.exports = router;
