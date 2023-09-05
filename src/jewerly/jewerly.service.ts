import { Injectable } from '@nestjs/common';
import { CreateJewerlyDto } from './dto/create-jewerly.dto';
import { UpdateJewerlyDto } from './dto/update-jewerly.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Jewerly } from './model/jewerly.model';

@Injectable()
export class JewerlyService {
  constructor(
    @InjectModel(Jewerly) private readonly jewerlyRepo: typeof Jewerly,
  ) {}

  async create(createCompanyDto: CreateJewerlyDto): Promise<Jewerly> {
    const company = await this.jewerlyRepo.create(createCompanyDto);
    return company;
  }

  async findAll(): Promise<Jewerly[]> {
    const company = await this.jewerlyRepo.findAll({
      include: { all: true },
    });
    return company;
  }

  async findOne(id: number): Promise<Jewerly> {
    const company = await this.jewerlyRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return company;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateJewerlyDto,
  ): Promise<Jewerly> {
    const company = await this.jewerlyRepo.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return company[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    const company = await this.jewerlyRepo.destroy({
      where: { id },
    })[0];
    return company;
  }
}
