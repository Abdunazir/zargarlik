import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface CompanyAttributes {
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

@Table({ tableName: 'company', timestamps: false })
export class Company extends Model<Company> implements CompanyAttributes {
  @ApiProperty({
    description: 'The unique identifier of the Company.',
    example: '1',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'The name of the company' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ description: 'The email address of the company' })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ description: 'The phone number of the company' })
  @Column({ type: DataType.STRING, allowNull: false })
  phone_number: string;

  @ApiProperty({ description: 'The address of the company' })
  @Column({ type: DataType.STRING, allowNull: false })
  address: string;
}
