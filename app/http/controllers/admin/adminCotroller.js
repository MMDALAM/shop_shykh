const controller = require("../controller");

class admin extends controller {
  async admin(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new admin();
