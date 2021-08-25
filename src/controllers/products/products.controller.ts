import { ProductsService } from "./products.service";
import { createOKResponce, createNotFoundResponce, requestDTO } from "../../utils/lambda-responce";

export class ProductsController {
  private productsService: ProductsService = new ProductsService();

  /**
   * GET /products/{productId}
   * @summary Return a product by ID.
   * @description Return a product by ID. ID interval [1, 8].
   * @pathParam {string} productId - Numeric ID of the product to get.
   * @response 200 - A JSON product
   * @responseContent {Product} 200.application/json
   * @response 404 - A user with the specified ID was not found.
   * @responseContent {Error} 404.application/json
   */
  public async getProductsById(id: string): Promise<requestDTO> {
    const product = await this.productsService.findProductById(id);

    if (product === undefined) {
      return createNotFoundResponce('Product not found');
    }

    return createOKResponce(product);
  }

 /**
   * GET /products
   * @summary Return a list of products.
   * @description Return a list of products.
   * @response 200 - A JSON array of products
   * @responseContent {Product[]} 200.application/json
   */
  public async getProductsList(): Promise<requestDTO> {
    const prductList = await this.productsService.getAllProducts();
    return createOKResponce(prductList);
  }
}
