import { Module } from '@nestjs/common';
import { JewerlyService } from './jewerly.service';
import { JewerlyController } from './jewerly.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Jewerly } from './model/jewerly.model';
import { User } from '../user/models/user.model';
import { Gender } from '../gender/model/gender.model';
import { JewerlyType } from '../jewerly_type/model/jewerly_type.model';
import { Company } from '../company/model/company.company';
import { Creator } from '../creator/model/creator.model';

@Module({
  imports:[SequelizeModule.forFeature([Jewerly,User,Gender,JewerlyType,Company,Creator])],
  controllers: [JewerlyController],
  providers: [JewerlyService],
})
export class JewerlyModule {}
