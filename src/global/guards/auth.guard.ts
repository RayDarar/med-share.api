import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const token = request.headers["authorization"].split(" ")[1];
      const result = jwt.verify(token, "super_secret");
      (request as any).user = result;
      return true;
    } catch (error) {
      return false;
    }
  }
}
