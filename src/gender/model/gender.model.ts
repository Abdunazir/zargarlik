import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface GenderAttr {
  name?: string;
}

@Table({ tableName: 'gender' })
export class Gender extends Model<Gender, GenderAttr> {
  @ApiProperty({
    description: 'The unique identifier of the jewerly type.',
    example: '1',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the jewerly type.',
    example: 'This is a name',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;
}
