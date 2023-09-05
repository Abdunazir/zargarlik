import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateJewerlyTypeDto {
  @ApiProperty({
    type: String,
    description: 'The name of the jewerly type',
    example: 'Ring',
  })
  @IsString()
  name: string;
}
