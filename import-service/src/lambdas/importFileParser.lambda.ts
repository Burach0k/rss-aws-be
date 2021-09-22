"use strict";

import { APIGatewayProxyEvent } from "aws-lambda";
import { ImportController } from "../controller/import.controller";

const importController = new ImportController();

module.exports.importFileParser = async (event: APIGatewayProxyEvent) => {
  return await importController.parseFile(event);
};
