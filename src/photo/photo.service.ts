import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './model/photo.model';

@Injectable()
export class PhotoService {
  constructor(@InjectModel(Photo) private readonly photoRepo: typeof Photo) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const photo = await this.photoRepo.create(createPhotoDto);
    return photo;
  }

  async findAll(): Promise<Photo[]> {
    const photo = await this.photoRepo.findAll({
      include: { all: true },
    });
    return photo;
  }

  async findOne(id: number): Promise<Photo> {
    const photo = await this.photoRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return photo;
  }

  async update(id: number, updateGenderDto: UpdatePhotoDto): Promise<Photo> {
    const photo = await this.photoRepo.update(updateGenderDto, {
      where: { id },
      returning: true,
    });
    return photo[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    const photo = await this.photoRepo.destroy({
      where: { id },
    })[0];
    return photo;
  }
}
