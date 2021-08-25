"use strict";

import { ProductsController } from "../controllers/products/products.controller";

const productsController = new ProductsController();

module.exports.getProductList = () => {
  return productsController.getProductsList();
};
