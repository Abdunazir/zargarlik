import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The ID of the user who made the comment',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    description: 'The ID of the jewelry associated with the comment',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  jewerly_id: number;

  @ApiProperty({
    description: 'The text content of the comment',
    example: 'This is a great jewelry piece!',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
