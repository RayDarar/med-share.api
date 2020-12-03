import { Injectable, Logger } from "@nestjs/common";
import oracledb, { Pool } from "oracledb";

@Injectable()
export class DatabaseService {
  private pool: Pool;

  public async init(): Promise<void> {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    try {
      this.pool = await oracledb.createPool({
        user: "sys",
        password: "Oracle18",
        connectionString: "med-share.ryspekov.life/xe",
        poolAlias: "default",
      });
      Logger.log("Database connection established", "DatabaseService");
    } catch (error) {
      Logger.error("Connection error", error.stack, "DatabaseService");
      process.exit(1);
    }
  }

  public async getConnection() {
    return this.pool.getConnection();
  }
}
