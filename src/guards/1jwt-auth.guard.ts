import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecException } from 'child_process';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi autorizatsiyadan o'tmagan!1",
      });
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi autorizatsiyadan o'tmagan2!",
      });
    }

    let user: any;
    try {
      user = await this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      console.log(user);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: "Foydalanuvchi autorizatsiyadan o'tmagan!3",
      });
    }

    req.user = user;
    console.log(user);

    return true;
  }
}
