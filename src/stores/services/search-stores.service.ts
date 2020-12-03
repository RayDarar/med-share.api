import { Inject, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import oracledb from "oracledb";

@Injectable()
export class SearchStoresService {
  @Inject(DatabaseService)
  private readonly db: DatabaseService;

  public async getAutocomplete(query: string) {
    return this.db.run(async (conn) => {
      const result = await this.db.callSelectProcedure(
        conn,
        "stores.get_autocomplete(:query, :result);",
        { query }
      );

      return result;
    });
  }

  public async searchStores(query: string, offset: number) {
    return this.db.run(async (conn) => {
      const result = await this.db.callSelectProcedure(
        conn,
        "stores.get_pharmacies(:query, :result, :offset, :count);",
        {
          query,
          offset: +offset,
          count: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
        },
        true
      );

      return result;
    });
  }

  public async searchByDrugId(id: number) {
    return this.db.run(async (conn) => {
      const result = await this.db.callSelectProcedure(
        conn,
        "stores.get_pharmacy_by_drug(:id, :result, :count);",
        {
          id,
          count: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
        },
        true
      );

      return result;
    });
  }
}
