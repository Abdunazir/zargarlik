import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface CreatorAttr {
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

@Table({ tableName: 'creator', timestamps: false })
export class Creator extends Model<Creator> implements CreatorAttr {
  @ApiProperty({
    description: 'The unique identifier of the creator.',
    example: '1',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ description: 'The name of the creator' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ description: 'The email address of the creator' })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ description: 'The phone number of the creator' })
  @Column({ type: DataType.STRING, allowNull: false })
  phone_number: string;

  @ApiProperty({ description: 'The address of the creator' })
  @Column({ type: DataType.STRING, allowNull: false })
  address: string;
}
