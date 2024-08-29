const router = require("express").Router();
const adminProductController = require("../../../../http/controllers/admin/adminProductController");
const { verifyToken } = require("../../../../http/middlewares/verifyToken");
const { uploadImg } = require("../../../../utils/multer");

router.get("/allProducts", verifyToken, adminProductController.allProduct);

router.get(
  "/singleProduct/:id",
  verifyToken,
  adminProductController.singleProduct
);

router.post(
  "/createProduct",
  verifyToken,
  uploadImg.array("images", 5),
  adminProductController.createProduct
);

router.put(
  "/editProduct/:id",
  verifyToken,
  uploadImg.array("images", 5),
  adminProductController.editProduct
);

router.delete(
  "/deleteProduct/:id",
  verifyToken,
  adminProductController.deleteProduct
);

module.exports = { adminRouter: router };
