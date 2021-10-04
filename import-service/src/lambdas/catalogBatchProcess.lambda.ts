"use strict";

import { ImportController } from "../controller/import.controller";

const importController = new ImportController();

module.exports.catalogBatchProcess = async (event: any) => {
  return importController.catalogBatchProcess(event);
};
