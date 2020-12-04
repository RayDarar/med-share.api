import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { AuthenticateUserDto } from "../dto/authenticate-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DBError } from "oracledb";

@Injectable()
export class UsersAuthService {
  @Inject(DatabaseService)
  private readonly db: DatabaseService;

  public async addUser(userInfo: CreateUserDto) {
    return this.db.run(async (conn) => {
      try {
        const password = await bcrypt.hash(
          userInfo.password,
          await bcrypt.genSalt(10)
        );
        const result = await this.db.callProcedure(
          conn,
          "user_management.register(:phone, :fullname, :password);",
          { ...userInfo, password }
        );

        await conn.commit();
        return result;
      } catch (error) {
        const { errorNum } = error as DBError;
        if (errorNum) throw new BadRequestException("Phone exists");
        throw new BadRequestException(error.message);
      }
    });
  }

  public async authenticate(userInfo: AuthenticateUserDto) {
    return this.db.run(async (conn) => {
      const [user] = await this.db.callSelectProcedure(
        conn,
        "user_management.authenticate(:phone, :result);",
        { phone: userInfo.phone }
      );

      if (!user) throw new NotFoundException("User not found");
      
      const result = await bcrypt.compare(userInfo.password, user.PASSWORD);
      if (!result) {
        throw new HttpException(
          "Passwords do not match",
          HttpStatus.UNAUTHORIZED
        );
      }

      const token = jwt.sign(
        {
          id: user.ID,
          phone: user.PHONE,
        },
        "super_secret"
      );
      delete user["PASSWORD"];
      return { token, user };
    });
  }

  public async getInfo(userInfo: AuthenticateUserDto) {
    return this.db.run(async (conn) => {
      const [user] = await this.db.callSelectProcedure(
        conn,
        "user_management.authenticate(:phone, :result);",
        { phone: userInfo.phone }
      );

      if (!user) throw new NotFoundException("User not found");
      delete user["PASSWORD"];
      return user;
    });
  }
}
