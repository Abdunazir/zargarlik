import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface JewerlyTypeAttr {
  name?: string;
}

@Table({ tableName: 'jewerly_type' })
export class JewerlyType extends Model<JewerlyType, JewerlyTypeAttr> {
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
