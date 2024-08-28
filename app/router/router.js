const router = require("express").Router();

const { authRouter } = require("./api/v1/auth/authRouter");
const { adminRouter } = require("./api/v1/admin/adminRouter");
const { productRouter } = require("./api/v1/product/productRouter");

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/admin", adminRouter);
router.use("/api/v1/product", productRouter);

module.exports = { AllRouters: router };
