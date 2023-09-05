import { Injectable } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Creator } from './model/creator.model';

@Injectable()
export class CreatorService {
  constructor(@InjectModel(Creator)private readonly creatorRepo:typeof Creator){}

  async create(createCreatorDto: CreateCreatorDto): Promise<Creator> {
    const creator = await this.creatorRepo.create(createCreatorDto);
    return creator;
  }

  async findAll(): Promise<Creator[]> {
    const creator = await this.creatorRepo.findAll({
      include: { all: true },
    });
    return creator;
  }

  async findOne(id: number): Promise<Creator> {
    const creator = await this.creatorRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return creator;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCreatorDto,
  ): Promise<Creator> {
    const creator = await this.creatorRepo.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return creator[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    const creator = await this.creatorRepo.destroy({
      where: { id },
    })[0];
    return creator;
  }
}
