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
}
