const controller = require("../controller");

class product extends controller {
  async product(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new product();
