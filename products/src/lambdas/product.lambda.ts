"use strict";

import { APIGatewayProxyEvent } from "aws-lambda";
import { ProductsController } from "../controller/products.controller";

const productsController = new ProductsController();

module.exports.product = (event: APIGatewayProxyEvent) => {
  const body = JSON.parse(event.body);
  const res = productsController.addProduct(body);

  return res;
};
