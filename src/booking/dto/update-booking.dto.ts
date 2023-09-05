import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsDate,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @ApiProperty({
    description: 'The user ID for the booking.',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  user_id: number;

  @ApiProperty({
    description: 'The jewelry ID for the booking.',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  jewerly_id: number;

  @ApiProperty({
    description: 'The delivery address for the booking.',
    example: '123 Main St, City',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The card number for payment.',
    example: '1234-5678-9012-3456',
  })
  @IsString()
  @IsNotEmpty()
  card_number: string;

  @ApiProperty({
    description: 'The quantity of jewelry items in the booking.',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'The delivery day for the booking.',
    example: '2023-09-10',
  })
  @IsDate()
  @IsNotEmpty()
  delivery_day: Date;
}
