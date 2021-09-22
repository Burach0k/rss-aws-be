"use strict";

import { APIGatewayProxyEvent } from "aws-lambda";
import { ProductsController } from "../controller/products.controller";

const productsController = new ProductsController();

module.exports.getProductsById = (event: APIGatewayProxyEvent) => {
  return productsController.getProductsById(event.pathParameters.productId);
};
