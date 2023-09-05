import { IsEmail, IsString, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'The name of the company' })
  @IsString()
  @Length(1, 255) // Example length validation
  name: string;

  @ApiProperty({ description: 'The email address of the company' })
  @IsEmail() // Email validation
  email: string;

  @ApiProperty({ description: 'The phone number of the company' })
  @IsString() // Phone number validation (ZZ allows any format)
  phone_number: string;

  @ApiProperty({ description: 'The address of the company' })
  @IsString()
  @Length(1, 255) // Example length validation
  address: string;
}
