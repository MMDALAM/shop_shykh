const { populate } = require("dotenv");
const { productModel } = require("../../../models/product");
const controller = require("../controller");

class product extends controller {
  async allProduct(req, res, next) {
    let options = {
      page: 1,
      limit: 5,
      projection: { _id: 0, owner: 0, __v: 0 },
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
    const { slug } = req.params;
    const product = await productModel.findOne(
      { slug },
      { _id: 0, owner: 0, __v: 0, updatedAt: 0 }
    );

    return res.status(200).json({
      product,
    });
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new product();
