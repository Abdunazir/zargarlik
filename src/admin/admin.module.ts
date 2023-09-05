import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from './models/admin.model';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, MailService],
  exports: [AdminService],
})
export class AdminModule {}
