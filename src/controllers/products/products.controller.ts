import { ProductsService } from "./products.service";
import { Log } from "../../utils/log.decorator";
import { Product } from "../../dto/product.dto";
import { StatusCode } from "../../utils/status-code.decorator";
import { Body } from "../../utils/body.decorator";

export class ProductsController {
  private productsService: ProductsService = new ProductsService();

  @Log()
  @StatusCode()
  public async getProductsById(id: string): Promise<any> {
    const product = await this.productsService.findProductById(id);
    return product;
  }

  @Log()
  @StatusCode()
  public async getProductsList(): Promise<any> {
    const prductList = await this.productsService.getAllProducts();
    return prductList;
  }

  @Log()
  @StatusCode()
  // @Body()
  public async addProduct(product: Omit<Product, "id">): Promise<any> {
    const productId = await this.productsService.addProductAndStock(product);
    return { productId };
  }
}
