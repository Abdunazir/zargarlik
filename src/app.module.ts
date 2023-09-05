import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from '......./app.service';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from './user/user.module';
import { JewerlyTypeModule } from './jewerly_type/jewerly_type.module';
import { GenderModule } from './gender/gender.module';
import { CompanyModule } from './company/company.module';
import { CreatorModule } from './creator/creator.module';
import { PhotoModule } from './photo/photo.module';
import { CommentModule } from './comment/comment.module';
import { JewerlyModule } from './jewerly/jewerly.module';
import { BookingModule } from './booking/booking.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Admin],
      autoLoadModels: true,
      logging: false,
    }),
    JwtModule.register({ global: true }),
    AdminModule,
    MailModule,
    UserModule,
    JewerlyTypeModule,
    GenderModule,
    CompanyModule,
    CreatorModule,
    PhotoModule,
    CommentModule,
    JewerlyModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
