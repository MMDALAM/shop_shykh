const router = require("express").Router();
const adminProductController = require("../../../../http/controllers/admin/adminProductController");
const { verifyToken } = require("../../../../http/middlewares/verifyToken");

router.get("/allProducts", verifyToken, adminProductController.allProduct);

router.get(
  "/singleProduct/:id",
  verifyToken,
  adminProductController.singleProduct
);

router.post(
  "/createProduct",
  verifyToken,
  adminProductController.createProduct
);

router.put("/editProduct/:id", verifyToken, adminProductController.editProduct);

router.delete(
  "/deleteProduct/:id",
  verifyToken,
  adminProductController.deleteProduct
);

module.exports = { adminRouter: router };
