"use strict";

import { APIGatewayProxyEvent } from "aws-lambda";
import { ProductsController } from "../controller/products.controller";

const productsController = new ProductsController();

module.exports.products = (event: APIGatewayProxyEvent) => {
  const body = JSON.parse(event.body);
  const res = productsController.addProducts(body);

  return res;
};
