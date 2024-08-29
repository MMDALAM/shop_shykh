const { productModel } = require("../../../models/product");
const { uniqueSlug } = require("../../../utils/functions");
const controller = require("../controller");

class adminProductController extends controller {
  async createProduct(req, res, next) {
    try {
      let { title, description } = req.body;
      let priceVariants = this.priceVariants(req.body.priceVariants);
      const slug = await uniqueSlug();

      const newProduct = new productModel({
        title,
        slug,
        description,
        priceVariants,
        owner: req.user.id,
      });
      await newProduct.save();
      const user = req.user;
      user.products.push(newProduct.id);
      await user.save();
      return res.status(200).json({
        message: `لباس مورد نظر ' ${title} ' با موفقیت ذخیره شد`,
      });
    } catch (err) {
      next(err);
    }
  }

  async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      let { title, description } = req.body;
      let priceVariants = this.priceVariants(req.body.priceVariants);
      let product = await productModel.findById(id);

      let objUpdate = {};
      objUpdate.title = title;
      objUpdate.description = description;
      objUpdate.priceVariants = priceVariants.length
        ? priceVariants
        : product.priceVariants;

      const updateProduct = await productModel.findByIdAndUpdate(id, objUpdate);
      if (!!updateProduct.modifiedCount)
        return res.status(200).json({
          message: `لباس مورد نظر ' ${title} ' بروزرسانی نشده`,
        });

      return res.status(200).json({
        message: `لباس مورد نظر ' ${title} '  با موفقیت بروزرسانی شد`,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const deleteProduct = await productModel.findByIdAndDelete(id);
      if (!deleteProduct)
        return res.status(200).json({
          message: `لباس مورد نظر پیدا نشده`,
        });

      return res.status(200).json({
        message: `لباس مورد نظر  با موفقیت حذف شد`,
      });
    } catch (err) {
      next(err);
    }
  }

  async allProduct(req, res, next) {
    try {
      let options = {
        page: 1,
        limit: 5,
      };
      const products = await productModel.paginate(
        {},
        {
          options,
          populate: [{ path: "owner", select: "firstName" }],
        }
      );
      return res.status(200).json({
        products,
      });
    } catch (err) {
      next(err);
    }
  }

  async singleProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productModel
        .findById(id)
        .populate("owner", "firstName");
      return res.status(200).json({
        product,
      });
    } catch (err) {
      next(err);
    }
  }

  priceVariants(model) {
    let priceVariants = [];
    if (!model) return priceVariants;
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
