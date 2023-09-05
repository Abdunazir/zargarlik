import { Module } from '@nestjs/common';
import { JewerlyTypeService } from './jewerly_type.service';
import { JewerlyTypeController } from './jewerly_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JewerlyType } from './model/jewerly_type.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([JewerlyType]), JwtModule.register({})],
  controllers: [JewerlyTypeController],
  providers: [JewerlyTypeService],
})
export class JewerlyTypeModule {}
