import { Inject, Injectable } from "@nestjs/common";
import OracleDB from "oracledb";
import { DatabaseService } from "src/database/database.service";
import { CreatePostDto } from "../dto/create-post.dto";

@Injectable()
export class PostsActionService {
  @Inject(DatabaseService)
  private readonly db: DatabaseService;

  public async addPost(id: number, postInfo: CreatePostDto) {
    return this.db.run(async (conn) => {
      const result = await this.db.callProcedure(
        conn,
        "posts_management.add_post(:id, :title, :status, :amount, :storage, :expires, :contacts);",
        {
          ...postInfo,
          id,
          expires: {
            val: new Date(postInfo.expires),
            type: OracleDB.DB_TYPE_DATE,
          },
        }
      );

      await conn.commit();

      return result;
    });
  }

  public async confirmPost(id: number) {
    return this.db.run(async (conn) => {
      const result = await this.db.callProcedure(
        conn,
        "posts_management.confirm_post(:id);",
        { id }
      );

      await conn.commit();

      return result;
    });
  }

  public async denyPost(id: number) {
    return this.db.run(async (conn) => {
      const result = await this.db.callProcedure(
        conn,
        "posts_management.deny_post(:id);",
        { id }
      );

      await conn.commit();

      return result;
    });
  }

  public async archivePost(id: number) {
    return this.db.run(async (conn) => {
      const result = await this.db.callProcedure(
        conn,
        "posts_management.archive_post(:id);",
        { id }
      );

      await conn.commit();

      return result;
    });
  }
}
