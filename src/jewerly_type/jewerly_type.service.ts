import { Injectable } from '@nestjs/common';
import { CreateJewerlyTypeDto } from './dto/create-jewerly_type.dto';
import { UpdateJewerlyTypeDto } from './dto/update-jewerly_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { JewerlyType } from './model/jewerly_type.model';

@Injectable()
export class JewerlyTypeService {
  constructor(
    @InjectModel(JewerlyType)
    private readonly jewerlyTypeRepo: typeof JewerlyType,
  ) {}

  async create(
    createJewerlyTypeDto: CreateJewerlyTypeDto,
  ): Promise<JewerlyType> {
    const jewerly = await this.jewerlyTypeRepo.create(createJewerlyTypeDto);
    return jewerly;
  }

  async findAll(): Promise<JewerlyType[]> {
    const jewerly = await this.jewerlyTypeRepo.findAll({
      include: { all: true },
    });
    return jewerly;
  }

  async findOne(id: number): Promise<JewerlyType> {
    const jewerly = await this.jewerlyTypeRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return jewerly;
  }

  async update(
    id: number,
    updateJewerlyTypeDto: UpdateJewerlyTypeDto,
  ): Promise<JewerlyType> {
    const jewerly = await this.jewerlyTypeRepo.update(updateJewerlyTypeDto, {
      where: { id },
      returning: true,
    });
    return jewerly[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    const jewerly = await this.jewerlyTypeRepo.destroy({
      where: { id },
    })[0];
    return jewerly;
  }
}
