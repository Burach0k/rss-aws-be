"use strict";

import { APIGatewayProxyEvent } from "aws-lambda";
import { ProductsController } from "../controllers/products/products.controller";

const productsController = new ProductsController();

module.exports.getProductsById = (event: APIGatewayProxyEvent) => {
  return productsController.getProductsById(event.pathParameters.productId);
};
