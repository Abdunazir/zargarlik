import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Gender } from '../../gender/model/gender.model';
import { JewerlyType } from '../../jewerly_type/model/jewerly_type.model';
import { Company } from '../../company/model/company.company';
import { Creator } from '../../creator/model/creator.model';
import { Comment } from '../../comment/model/comment.model';

interface JewelryAttributes {
  gender_id: number;
  name: string;
  type_id: number;
  width: string;
  weight: string;
  length: string;
  size: string;
  price: string;
  company_id: number;
  creator_id: number;
  description: string;
  //   comment_id: number;
}

@Table({
  tableName: 'jewelry',
  timestamps: false,
})
export class Jewerly extends Model<Jewerly> implements JewelryAttributes {
  @ApiProperty({
    description: 'The unique identifier of the jewerly.',
    example: '1',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'The ID of the jewelry associated with the gender.',
    example: 1,
  })
  @ForeignKey(() => Gender)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  gender_id: number;

  @BelongsTo(() => Gender)
  gender: Gender[];

  @ApiProperty({
    description: 'The text name of the jewerly.',
    example: 'This is a great jewelry piece!',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    description: 'The ID of the jewelry associated with the type.',
    example: 1,
  })
  @ForeignKey(() => JewerlyType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  type_id: number;

  @BelongsTo(() => JewerlyType)
  type: JewerlyType[];

  @ApiProperty({
    description: 'The text content of the width.',
    example: '15',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  width: string;

  @ApiProperty({
    description: 'The text content of the weight.',
    example: '15',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  weight: string;

  @ApiProperty({
    description: 'The text content of the length.',
    example: '15',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  length: string;

  @ApiProperty({
    description: 'The text content of the size.',
    example: '15',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  size: string;

  @ApiProperty({
    description: 'The text content of the price.',
    example: '15000',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @ApiProperty({
    description: 'The ID of the jewelry associated with the company.',
    example: 1,
  })
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  company_id: number;

  @BelongsTo(() => Company)
  company: Company[];

  @ApiProperty({
    description: 'The ID of the jewelry associated with the creator.',
    example: 1,
  })
  @ForeignKey(() => Creator)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  creator_id: number;

  @BelongsTo(() => Creator)
  creator: Creator[];

  @ApiProperty({
    description: 'The text content of the description.',
    example: 'This is a great jewelry piece!',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  //   @ApiProperty({
  //     description: 'The ID of the jewelry associated with the comment.',
  //     example: 1,
  //   })
  //   @ForeignKey(() => Comment)
  //   @Column({
  //     type: DataType.INTEGER,
  //     allowNull: false,
  //   })
  //   comment_id: number;

  //   @BelongsTo(() => Comment)
  //   comment: Comment[];
}
