import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'cdd_gaceta_lxi',
  underscored: true,
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
})
export class Gaceta extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50)
  })
  declare date: string;

  @Column({
    type: DataType.INTEGER
  })
  declare year: number;

  @Column({
    type: DataType.INTEGER
  })
  declare numero: number;

  @Column({
    type: DataType.INTEGER
  })
  declare tomo: number;

  @Column({
    type: DataType.STRING(50)
  })
  declare documento: string;

  @Column({
    type: DataType.INTEGER
  })
  declare size: number;

  @Column({
    type: DataType.STRING(50)
  })
  declare format: string;
}