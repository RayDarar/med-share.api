import { Module } from "@nestjs/common";
import { UsersAuthController } from "./controllers/users-auth.controller";
import { UsersAuthService } from "./services/users-auth.service";

@Module({
  controllers: [UsersAuthController],
  providers: [UsersAuthService],
})
export class UsersModule {}
