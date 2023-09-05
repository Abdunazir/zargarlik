import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PhotoAttributes {
  jewerly_id: number;
  photo_url: string;
}

@Table({ tableName: 'photos', timestamps: false })
export class Photo extends Model<Photo> implements PhotoAttributes {
  @ApiProperty({
    description: 'The unique identifier of the photo.',
    example: '1',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'The ID of the jewelry associated with the photo',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  jewerly_id: number;

  @ApiProperty({ description: 'The URL or path of the photo' })
  @Column({ type: DataType.STRING, allowNull: false })
  photo_url: string;
}
