"use strict";

import { ProductsController } from "../controller/products.controller";

const productsController = new ProductsController();

module.exports.getProductList = () => {
  return productsController.getProductsList();
};
