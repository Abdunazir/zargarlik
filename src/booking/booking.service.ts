import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './model/booking.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private readonly bookingRepo: typeof Booking,
  ) {}

  async create(createCompanyDto: CreateBookingDto): Promise<Booking> {
    const comment = await this.bookingRepo.create(createCompanyDto);
    return comment;
  }

  async findAll(): Promise<Booking[]> {
    const comment = await this.bookingRepo.findAll({
      include: { all: true },
    });
    return comment;
  }

  async findOne(id: number): Promise<Booking> {
    const comment = await this.bookingRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return comment;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateBookingDto,
  ): Promise<Booking> {
    const comment = await this.bookingRepo.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return comment[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    const comment = await this.bookingRepo.destroy({
      where: { id },
    })[0];
    return comment;
  }
}
