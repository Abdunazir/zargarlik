import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateJewerlyTypeDto } from './create-jewerly_type.dto';
import { IsString } from 'class-validator';

export class UpdateJewerlyTypeDto extends PartialType(CreateJewerlyTypeDto) {
  @ApiProperty({
    type: String,
    description: 'The name of the jewerly type',
    example: 'Ring',
  })
  @IsString()
  name?: string;
}
