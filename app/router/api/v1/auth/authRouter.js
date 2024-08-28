const router = require("express").Router();
const authController = require("../../../../http/controllers/auth/authController");

router.post("/", authController.auth);
router.post("/login", authController.login);

module.exports = { authRouter: router };
