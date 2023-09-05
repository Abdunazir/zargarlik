import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { MailService1 } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly adminRepo: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService1, // private readonly jwtService:JwtService,
  ) {}

  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.adminRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Password wrong');
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.adminRepo.create({
      ...createUserDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const uniqueKey: string = uuidv4();
    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newUser.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendUserConfirmation(updateAdmin[1][0]);
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'User registered',
      user: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(user: User) {
    const jwrPayload = {
      id: user.id,
      is_active: user.is_active,
      role: 'user',
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwrPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwrPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refreshToken: refreshToken,
    };
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.adminRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not registered');
    }
    if (!user.is_active) {
      throw new BadRequestException('User is not active');
    }
    const isPass = await bcrypt.compare(password, user.hashed_password);
    if (!isPass) {
      throw new UnauthorizedException('User is not registered(pass)');
    }
    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedUser = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: user.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not found');
    }
    const updateUser = await this.adminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: userData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out',
      user: updateUser[1][0],
    };
    return response;
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('user not found');
    }
    const user = await this.adminRepo.findOne({ where: { id: user_id } });
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('user not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('forbidden');
    }
    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedUser = await this.adminRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: user_id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'User refreshed',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  // async findAll(findUserDto: FindUserDto) {
  //   const where = {};
  //   if (findUserDto.first_name) {
  //     where['first_name'] = {
  //       [Op.like]: `%${findUserDto.first_name}%`,
  //     };
  //   }

  //   if (findUserDto.last_name) {
  //     where['last_name'] = {
  //       [Op.like]: `%${findUserDto.last_name}%`,
  //     };
  //   }
  //   const users = await User.findAll({ where });
  //   if (!users) {
  //     throw new BadRequestException('users not found');
  //   }
  //   return users;
  // }

  // async findAllAdmins(role: string) {
  //   // const roleId = await this.roleService.getRoleByValue(role);
  //   // if (!roleId) {
  //   //   throw new BadRequestException('role not found');
  //   // }
  //   const admins = await this.adminRepo.findAll({
  //     where: { role_id: roleId.id },
  //     include: { all: true },
  //   });
  //   return admins;
  // }

  async findAll(): Promise<User[]> {
    const admins = await this.adminRepo.findAll({ include: { all: true } });
    return admins;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updatesUser = await this.adminRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updatesUser[1][0]) {
      throw new BadRequestException('User already activated');
    }
    const response = {
      message: 'User activated successfully',
      user: updatesUser,
    };
    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateAdminDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
