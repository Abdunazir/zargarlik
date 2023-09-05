import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePhotoDto } from './create-photo.dto';
import { IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  @ApiProperty({
    description: 'The ID of the jewelry associated with the photo',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  jewerly_id: number;

  @ApiProperty({
    description: 'The URL or path of the photo',
    example: 'https://example.com/photo.jpg',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  photo_url: string;
}
