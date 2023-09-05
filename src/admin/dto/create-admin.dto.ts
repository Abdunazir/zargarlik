import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsBoolean } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the admin',
  })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the admin',
  })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Username of the admin',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the admin',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Phone number of the admin',
  })
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the admin account (min length: 6)',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'password123',
    description: 'Confirmation of the admin password (min length: 6)',
  })
  @IsNotEmpty()
  @MinLength(6)
  confirm_password: string;

}
