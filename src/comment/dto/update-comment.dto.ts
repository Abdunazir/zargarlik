import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
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
