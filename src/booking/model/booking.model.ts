import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty
import { User } from '../../user/models/user.model';
import { Jewerly } from '../../jewerly/model/jewerly.model';

interface BookingAttributes {
  user_id: number;
  jewerly_id: number;
  address: string;
  card_number: string;
  quantity: number;
  delivery_day: Date;
}

@Table({
  tableName: 'bookings',
  timestamps: false, // Set timestamps to false
})
export class Booking extends Model<Booking> implements BookingAttributes {
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

  @ApiProperty({
    description: 'The user ID for the booking.',
    example: 1,
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User[];

  @ApiProperty({
    description: 'The jewelry ID for the booking.',
    example: 1,
  })
  @ForeignKey(() => Jewerly)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  jewerly_id: number;

  @BelongsTo(() => Jewerly)
  jewerly: Jewerly[];

  @ApiProperty({
    description: 'The delivery address for the booking.',
    example: '123 Main St, City',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({
    description: 'The card number for payment.',
    example: '1234-5678-9012-3456',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  card_number: string;

  @ApiProperty({
    description: 'The quantity of jewelry items in the booking.',
    example: 2,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @ApiProperty({
    description: 'The delivery day for the booking.',
    example: '2023-09-10',
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  delivery_day: Date;
}
