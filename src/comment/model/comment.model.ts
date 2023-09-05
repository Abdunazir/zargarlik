import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/models/user.model';
import { Jewerly } from '../../jewerly/model/jewerly.model';

interface CommentAttributes {
  user_id: number;
  jewerly_id: number;
  comment: string;
}

@Table({
  tableName: 'comments',
  timestamps: false, // Set timestamps to false
})
export class Comment extends Model<Comment> implements CommentAttributes {
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
    description: 'The ID of the user who made the comment.',
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
    description: 'The ID of the jewelry associated with the comment.',
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
    description: 'The text content of the comment.',
    example: 'This is a great jewelry piece!',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;
}
