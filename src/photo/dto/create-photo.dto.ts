import { IsInt, IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
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
