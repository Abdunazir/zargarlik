import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { MailService1 } from '../mail/mail.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService, MailService1],
  exports: [UserService],
})
export class UserModule {}
