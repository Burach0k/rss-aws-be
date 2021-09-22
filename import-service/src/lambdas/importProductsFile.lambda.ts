"use strict";

import { APIGatewayProxyEvent } from "aws-lambda";
import { ImportController } from "../controller/import.controller";

const importController = new ImportController();

module.exports.importProductsFile = async (event: APIGatewayProxyEvent) => {
  return importController.getPresignedGETURL(event);
};
