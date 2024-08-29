const { productModel } = require("../../../models/product");
const controller = require("../controller");

class adminProductController extends controller {
  async createProduct(req, res, next) {
    try {
      let { title, description } = req.body;
      let priceVariants = this.priceVariants(req.body.priceVariants);

      const newProduct = new productModel({
        title,
        description,
        priceVariants,
        owner: req.user.id,
      });
      await newProduct.save();
      return res.status(200).json({
        message: `لباس مورد نظر ' ${title} ' با موفقیت ذخیره شد`,
      });
    } catch (err) {
      next(err);
    }
  }

  async editProduct(req, res, next) {
    try {
      return res.status(200).json({
        msg: "salam",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      return res.status(200).json({
        msg: "salam",
      });
    } catch (err) {
      next(err);
    }
  }

  priceVariants(model) {
    let priceVariants = [];
    model.split("/").filter((key) => {
      let k = key.split(",");
      for (let i = 0; i < 1; i++) {
        priceVariants.push({
          size: k[i], // size
          color: k[i + 1], // color
          price: Number(k[i + 2]), // price
        });
      }
    });
    return priceVariants;
  }
}

module.exports = new adminProductController();
