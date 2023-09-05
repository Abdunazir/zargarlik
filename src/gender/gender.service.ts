import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Gender } from './model/gender.model';

@Injectable()
export class GenderService {
  constructor(
    @InjectModel(Gender) private readonly genderRepo: typeof Gender,
  ) {}

  async create(
    createGenderDto: CreateGenderDto,
  ): Promise<Gender> {
    const gender = await this.genderRepo.create(createGenderDto);
    return gender;
  }

  async findAll(): Promise<Gender[]> {
    const gender = await this.genderRepo.findAll({
      include: { all: true },
    });
    return gender;
  }

  async findOne(id: number): Promise<Gender> {
    const gender = await this.genderRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return gender;
  }

  async update(
    id: number,
    updateGenderDto: UpdateGenderDto,
  ): Promise<Gender> {
    const gender = await this.genderRepo.update(updateGenderDto, {
      where: { id },
      returning: true,
    });
    return gender[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    const gender = await this.genderRepo.destroy({
      where: { id },
    })[0];
    return gender;
  }
}
