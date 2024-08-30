const { populate } = require("dotenv");
const { productModel } = require("../../../models/product");
const controller = require("../controller");
const createError = require("http-errors");

class product extends controller {
  async allProduct(req, res, next) {
    let options = {
      page: 1,
      limit: 5,
      projection: { _id: 0, owner: 0, images: 0, __v: 0 },
    };
    const products = await productModel.paginate({}, { options });
    return res.status(200).json({
      products,
    });
    try {
    } catch (err) {
      next(err);
    }
  }
  async singleProduct(req, res, next) {
    try {
      const { slug } = req.params;
      const product = await productModel.findOne(
        { slug },
        { _id: 0, owner: 0, images: 0, __v: 0, updatedAt: 0 }
      );
      if (!product) throw createError.BadRequest("لباس مورد نظر پیدا نشد");

      return res.status(200).json({
        product,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new product();
