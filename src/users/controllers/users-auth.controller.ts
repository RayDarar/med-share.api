import { Body, Controller, Inject, Post } from "@nestjs/common";
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
}
