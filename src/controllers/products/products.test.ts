import { ProductsController } from "./products.controller";
import { ProductsService } from './products.service';

describe("Test products service", () => {
  const productsService = new ProductsService();

  test("return product if set exist id", () => {
    return productsService.findProductById('1').then((res) => {
      expect(res).toBeDefined();
    });
  });

  test("return undefined if set not exist id", () => {
    return productsService.findProductById('10').then((res) => {
      expect(res).toBeUndefined();
    });
  });

  test("return undefined if set not id", () => {
    return productsService.findProductById('id').then((res) => {
      expect(res).toBeUndefined();
    });
  });

  test("return product list", () => {
    return productsService.getAllProducts().then((res) => {
      expect(res.length).toBeDefined();
    });
  });
});

describe("Test products controller", () => {
  const productsController = new ProductsController();

  test("return product if set exist id", () => {
    return productsController.getProductsById('1').then((res) => {
      expect(res).toBeDefined();
      expect(res.statusCode).toEqual(200);
    });
  });

  test("return error 'Product not found' if set not exist id", () => {
    return productsController.getProductsById('10').catch((res) => {
      expect(res).toEqual('Product not found');
      expect(res.statusCode).toEqual(404);
    });
  });

  test("return product list", () => {
    return productsController.getProductsList().then((res) => {
      expect(res.body).toBeDefined();
      expect(res.statusCode).toEqual(200);
    });
  });
});
