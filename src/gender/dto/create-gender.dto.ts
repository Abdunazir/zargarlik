import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenderDto {
  @ApiProperty({
    type: String,
    description: 'The name of the gender',
    example: 'Man',
  })
  @IsString()
  name: string;
}
