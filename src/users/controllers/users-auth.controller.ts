import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/global/guards/auth.guard";
import { AuthenticateUserDto } from "../dto/authenticate-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersAuthService } from "../services/users-auth.service";

@Controller("/users")
export class UsersAuthController {
  @Inject(UsersAuthService)
  private readonly service: UsersAuthService;

  @Post("/")
  public addUser(@Body() body: CreateUserDto) {
    return this.service.addUser(body);
  }

  @Post("/authenticate")
  public authenticate(@Body() body: AuthenticateUserDto) {
    return this.service.authenticate(body);
  }

  @UseGuards(new AuthGuard())
  @Get("/info")
  public getInfo(@Req() req) {
    return this.service.getInfo(req.user);
  }
}
