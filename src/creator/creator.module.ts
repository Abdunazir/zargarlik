import { Module } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { CreatorController } from './creator.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Creator } from './model/creator.model';

@Module({
  imports: [SequelizeModule.forFeature([Creator])],
  controllers: [CreatorController],
  providers: [CreatorService],
})
export class CreatorModule {}
