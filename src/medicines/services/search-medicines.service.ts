import { Inject, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

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
        "medicines.get_medicines(:query, :result, :offset);",
        {
          query,
          offset: +offset,
        }
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
