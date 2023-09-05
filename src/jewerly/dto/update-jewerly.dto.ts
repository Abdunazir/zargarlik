import { PartialType } from '@nestjs/swagger';
import { CreateJewerlyDto } from './create-jewerly.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJewerlyDto extends PartialType(CreateJewerlyDto) {
  @ApiProperty({
    example: 1,
    description: 'The ID of the gender associated with the jewelry.',
  })
  @IsNumber({}, { message: 'Gender ID must be a number' })
  @IsNotEmpty({ message: 'Gender ID is required' })
  gender_id: number;

  @ApiProperty({
    example: 'Gold Necklace',
    description: 'The name of the jewelry.',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the jewelry type.',
  })
  @IsNumber({}, { message: 'Type ID must be a number' })
  @IsNotEmpty({ message: 'Type ID is required' })
  type_id: number;

  @ApiProperty({
    example: '5 mm',
    description: 'The width of the jewelry.',
  })
  @IsString({ message: 'Width must be a string' })
  @IsNotEmpty({ message: 'Width is required' })
  width: string;

  @ApiProperty({
    example: '10 grams',
    description: 'The weight of the jewelry.',
  })
  @IsString({ message: 'Weight must be a string' })
  @IsNotEmpty({ message: 'Weight is required' })
  weight: string;

  @ApiProperty({
    example: '18 inches',
    description: 'The length of the jewelry.',
  })
  @IsString({ message: 'Length must be a string' })
  @IsNotEmpty({ message: 'Length is required' })
  length: string;

  @ApiProperty({
    example: 'Medium',
    description: 'The size of the jewelry.',
  })
  @IsString({ message: 'Size must be a string' })
  @IsNotEmpty({ message: 'Size is required' })
  size: string;

  @ApiProperty({
    example: '$500',
    description: 'The price of the jewelry.',
  })
  @IsString({ message: 'Price must be a string' })
  @IsNotEmpty({ message: 'Price is required' })
  price: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the company that produces the jewelry.',
  })
  @IsNumber({}, { message: 'Company ID must be a number' })
  @IsNotEmpty({ message: 'Company ID is required' })
  company_id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the creator of the jewelry.',
  })
  @IsNumber({}, { message: 'Creator ID must be a number' })
  @IsNotEmpty({ message: 'Creator ID is required' })
  creator_id: number;

  @ApiProperty({
    example: 'A beautiful gold necklace with a heart-shaped pendant.',
    description: 'The description of the jewelry.',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  //   @ApiProperty({
  //     example: 1,
  //     description: 'The ID of the comment associated with the jewelry.',
  //   })
  //   @IsNumber({}, { message: 'Comment ID must be a number' })
  //   @IsNotEmpty({ message: 'Comment ID is required' })
  //   comment_id: number;
}
