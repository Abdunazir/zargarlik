import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './model/booking.model';
import { User } from '../user/models/user.model';
import { Jewerly } from '../jewerly/model/jewerly.model';

@Module({
  imports: [SequelizeModule.forFeature([Booking, User, Jewerly])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
