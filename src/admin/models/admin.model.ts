import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface AdminAttr {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  hashed_password: string;
  is_active: boolean;
  is_creator: boolean;
  hashed_refresh_token: string;
  is_owner: boolean;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttr> {
  @ApiProperty({
    description: 'The unique identifier of the user.',
    example: '1',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'First name of the admin' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the admin' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'johndoe', description: 'Username of the admin' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the admin',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Phone number of the admin',
  })
  @Column({ type: DataType.STRING })
  phone_number: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the admin account (min length: 6)',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  hashed_password: string;

  @ApiProperty({
    example: 'password123',
    description: 'Confirmation of the admin password (min length: 6)',
  })
  @Column({ type: DataType.STRING })
  confirm_password: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the admin is active or not',
  })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: false })
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the admin is a creator',
  })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: false })
  is_creator: boolean;

  @ApiProperty({
    example: 'hashed_refresh_token',
    description: 'Hashed refresh token of the user',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    description: 'Indicates whether the user is an owner.',
    example: true,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;
}
