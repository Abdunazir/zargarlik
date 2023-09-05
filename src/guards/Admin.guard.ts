import { JwtService } from '@nestjs/jwt/dist';
import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { User } from '../user/models/user.model';
import { Model } from 'sequelize-typescript';
// import { Admin } from '../admin/models/admin.model';

interface UserAttr extends Model<User> {
  is_active: boolean;
  role: string;
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Admin unathored');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Admin unathored');
    }

    async function verify(token: string, jwtService: JwtService) {
      const Admin: Partial<UserAttr> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!Admin) {
        throw new UnauthorizedException('invaled token proved');
      }
      if (!Admin.is_active) {
        throw new UnauthorizedException('Admin not active');
      }
      if (Admin.role == 'admin') {
        return true;
      }
        throw new UnauthorizedException('User is not Admin');
    }
    return verify(token, this.jwtService);
  }
}
