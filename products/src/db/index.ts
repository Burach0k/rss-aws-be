import { Client, QueryConfig, QueryResult } from 'pg';

const { PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME, PG_DATABASE } = process.env;

export class DataBase {
  public static createClient = () => new Client({
    user: PG_USERNAME,
    host: PG_HOST,
    port: +PG_PORT,
    database: PG_DATABASE,
    password: PG_PASSWORD,
    ssl: false,
  });

  public static async query<T>(queryTextOrConfig: string | QueryConfig<any[]>, values?: any[]): Promise<QueryResult<T>> {
    try {
      const client = DataBase.createClient();

      await client.connect();

      const result = await client.query(queryTextOrConfig, values);

      client.end();

      return result;
    } catch (error) {
      throw(error);
    }
  }
}
