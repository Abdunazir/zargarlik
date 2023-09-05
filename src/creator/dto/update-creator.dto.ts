import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCreatorDto } from './create-creator.dto';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateCreatorDto extends PartialType(CreateCreatorDto) {
  @ApiProperty({ description: 'The name of the creator' })
  @IsString()
  @Length(1, 255) // Example length validation
  name: string;

  @ApiProperty({ description: 'The email address of the creator' })
  @IsEmail() // Email validation
  email: string;

  @ApiProperty({ description: 'The phone number of the creator' })
  @IsString() // Phone number validation (ZZ allows any format)
  phone_number: string;

  @ApiProperty({ description: 'The address of the creator' })
  @IsString()
  @Length(1, 255) // Example length validation
  address: string;
}
