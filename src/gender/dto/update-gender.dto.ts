import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGenderDto } from './create-gender.dto';
import { IsString } from 'class-validator';

export class UpdateGenderDto extends PartialType(CreateGenderDto) {
  @ApiProperty({
    type: String,
    description: 'The name of the gender',
    example: 'Man',
  })
  @IsString()
  name?: string;
}
