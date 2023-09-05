import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: '....@gmail.com',
    description: "User's email",
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
