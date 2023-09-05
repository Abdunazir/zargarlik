import { JwtService } from '@nestjs/jwt/dist';
import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { User } from '../user/models/user.model';
import { Model } from 'sequelize-typescript';
// import { User } from '../admin/models/admin.model';

interface UserAttr extends Model<User> {
  is_active: boolean;
  role: string;
}

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('User unathored');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('User unathored');
    }

    async function verify(token: string, jwtService: JwtService) {
      const User: Partial<UserAttr> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!User) {
        throw new UnauthorizedException('invaled token proved');
      }
      if (!User.is_active) {
        throw new UnauthorizedException('User not active');
      }
      if (User.role == 'user') {
        return true;
      }
      throw new UnauthorizedException('You have not access');
    }
    return verify(token, this.jwtService);
  }
}
