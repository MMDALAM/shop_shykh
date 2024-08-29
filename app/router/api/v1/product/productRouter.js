const productController = require("../../../../http/controllers/product/productController");

const router = require("express").Router();

router.get("/", productController.allProduct);
router.get("/:slug", productController.singleProduct);

module.exports = { productRouter: router };
