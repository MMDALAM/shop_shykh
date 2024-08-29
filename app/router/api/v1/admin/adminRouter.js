const router = require("express").Router();
const adminProductController = require("../../../../http/controllers/admin/adminProductController");
const { verifyToken } = require("../../../../http/middlewares/verifyToken");

router.post(
  "/createProduct",
  verifyToken,
  adminProductController.createProduct
);

router.put("/editProduct", verifyToken, adminProductController.createProduct);

router.delete(
  "/deleteProduct",
  verifyToken,
  adminProductController.createProduct
);

module.exports = { adminRouter: router };
