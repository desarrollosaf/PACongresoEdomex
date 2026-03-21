import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'legislacions',
  underscored: true,
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
})
export class Legislacion extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare nombre: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare path: string;

  @Column({
    field: 'createdAt',
    type: DataType.DATE,
    allowNull: true
  })
  declare createdAt: Date;

  @Column({
    field: 'updatedAt',
    type: DataType.DATE,
    allowNull: true
  })
  declare updatedAt: Date;
}