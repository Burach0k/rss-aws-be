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

  public async addProductAndStock({ title, description, price, count = 0 }: Omit<Product, "id">) {
    const client = DataBase.createClient();

    try {
      await client.connect();
      
      await client.query('BEGIN');

      const productId: string = await client.query(
        `INSERT INTO PRODUCTS (id, title, description, price)
        VALUES(uuid_generate_v1(), $1, $2, $3)
        RETURNING id;`, [title, description, price]
      ).then(result => result.rows[0].product_id);

      await client.query(
        `INSERT INTO STOCKS (product_id, count)
        VALUES($1, $2);`, [productId, count]
      );

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.end();
    }
  }
}
