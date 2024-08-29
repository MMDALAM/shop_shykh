const controller = require("../controller");

class adminController extends controller {
  async index(req, res, next) {
    try {
      return res.status(200).json({
        msg: "salam",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new adminController();
