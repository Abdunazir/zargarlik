import {
  IsEmail,
  IsString,
  IsBoolean,
  IsPhoneNumber,
  Length,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user.',
    example: 'John',
  })
  @IsString()
  @Length(1, 255)
  first_name: string;

  @ApiProperty({
    description: 'The last name of the user.',
    example: 'Doe',
  })
  @IsString()
  @Length(1, 255)
  last_name: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The phone number of the user.',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({
    description: 'The hashed password of the user.',
    example: 'hashed_password_here',
  })
  @IsString()
  @Length(8, 255)
  password: string;

  @ApiProperty({
    example: 'password123',
    description: 'Confirmation of the admin password (min length: 6)',
  })
  @IsNotEmpty()
  @MinLength(6)
  confirm_password: string;

  //   @ApiProperty({
  //     description: 'Indicates whether the user is active.',
  //     example: true,
  //   })
  //   @IsBoolean()
  //   is_active: boolean;

  //   @ApiProperty({
  //     description: 'The hashed refresh token for the user.',
  //     example: 'hashed_refresh_token_here',
  //   })
  //   @IsString()
  //   @Length(8, 255)
  //   hashed_refresh_token: string;
}
