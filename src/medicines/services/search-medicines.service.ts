import { Inject, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import oracledb from "oracledb";

@Injectable()
export class SearchMedicinesService {
  @Inject(DatabaseService)
  private readonly db: DatabaseService;

  public async getAutocomplete(query: string) {
    return this.db.run(async (conn) => {
      const result = await this.db.callSelectProcedure(
        conn,
        "medicines.get_autocomplete(:query, :result);",
        { query }
      );

      return result;
    });
  }

  public async searchMedicines(query: string, offset: number) {
    return this.db.run(async (conn) => {
      const result = await this.db.callSelectProcedure(
        conn,
        "medicines.get_medicines(:query, :result, :offset, :count);",
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

  public async getMedicine(id: number) {
    return this.db.run(async (conn) => {
      const [medicine] = await this.db.callSelectProcedure(
        conn,
        "medicines.get_medicine(:id, :result);",
        { id }
      );

      const analogs = await this.db.callSelectProcedure(
        conn,
        "medicines.get_analogs(:id, :result);",
        { id }
      );

      return { medicine, analogs: analogs };
    });
  }
}
