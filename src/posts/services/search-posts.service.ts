import { Inject, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import oracledb from "oracledb";

@Injectable()
export class SearchPostsService {
  @Inject(DatabaseService)
  private readonly db: DatabaseService;

  public async getAutocomplete(query: string) {
    return this.db.run(async (conn) => {
      const result = await this.db.callSelectProcedure(
        conn,
        "posts_management.get_autocomplete(:query, :result);",
        { query }
      );

      return result;
    });
  }

  public async searchPosts(query: string, offset: number) {
    return this.db.run(async (conn) => {
      const result = await this.db.callSelectProcedure(
        conn,
        "posts_management.get_posts(:query, :result, :offset, :count);",
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

  public async getMyPosts(id: number) {
    return this.db.run(async (conn) => {
      const result = await this.db.callSelectProcedure(
        conn,
        "posts_management.get_my_posts(:id, :result);",
        { id }
      );

      return result;
    });
  }

  public async getConfirmationPosts() {
    return this.db.run(async (conn) => {
      const result = await this.db.callSelectProcedure(
        conn,
        "posts_management.get_confirmation_posts(:result);",
        {}
      );

      return result;
    });
  }
}
