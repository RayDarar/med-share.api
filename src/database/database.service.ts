import { Injectable, Logger } from "@nestjs/common";
import oracledb, { Pool, ResultSet } from "oracledb";

@Injectable()
export class DatabaseService {
  private pool: Pool;

  public async init(): Promise<void> {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    try {
      this.pool = await oracledb.createPool({
        user: "super_user",
        password: "super_secret",
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

  public async run(callback: (conn: oracledb.Connection) => Promise<any>) {
    const conn = await this.getConnection();
    const result = await callback(conn);
    await conn.close();
    return result;
  }

  public async callSelectProcedure(
    conn: oracledb.Connection,
    name: string,
    params: oracledb.BindParameters
  ) {
    const result = await conn.execute<any>(`begin ${name} end;`, {
      ...params,
      result: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    });
    const resultSet: ResultSet<any> = result.outBinds.result;
    const arr = [];
    let item = null;
    while ((item = await resultSet.getRow())) arr.push(item);
    await resultSet.close();
    return arr;
  }
}
