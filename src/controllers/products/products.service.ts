import { DataBase } from "../../db";
import { Product } from "../../dto/product.dto";

export class ProductsService {

  public findProductById(id: string): Promise<Product | undefined> {
    return DataBase.query<Product>(`
      SELECT PRODUCTS.id, PRODUCTS.title, PRODUCTS.description, PRODUCTS.price, STOCKS.count 
      FROM PRODUCTS
      INNER JOIN STOCKS ON STOCKS.product_id = PRODUCTS.id
      WHERE PRODUCTS.id = $1
      ORDER BY title LIMIT 1;`, [id]
    ).then(result => result.rows[0]);
  }

  public getAllProducts(): Promise<Product[]> {
    return DataBase.query<Product>(`
      SELECT PRODUCTS.id, PRODUCTS.title, PRODUCTS.description, PRODUCTS.price, STOCKS.count 
      FROM PRODUCTS
      INNER JOIN STOCKS ON STOCKS.product_id = PRODUCTS.id
      ORDER BY title;`
    ).then(result => result.rows);
  }

  public addProduct({ title, description, price, count = 0 }: Omit<Product, "id">): Promise<number> {
    return DataBase.query<{ product_id: number }>(`
      WITH product as (
        INSERT INTO PRODUCTS (id, title, description, price)
        VALUES(uuid_generate_v1(), $1, $2, $3)
        RETURNING id
      )
      INSERT INTO STOCKS (product_id, count)
      VALUES(
        (SELECT product.id FROM product), $4
      ) RETURNING product_id;`,
      [title, description, price, count]
    ).then(result => result.rows[0].product_id);
  }
}
