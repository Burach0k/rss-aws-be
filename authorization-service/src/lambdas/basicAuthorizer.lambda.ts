"use strict";

import { AuthService } from "../services/products.service";

const authService = new AuthService();

module.exports.basicAuthorizer = async (event, _, callback) => {
  return authService.tokenAuth(event, _, callback);
};
