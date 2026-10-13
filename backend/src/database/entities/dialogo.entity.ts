import {
  Column,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'dialogo',
  underscored: true,
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
export class Dialogo extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare titulo: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare fecha: Date | null;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  declare texto: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare liga: string;

   @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare imagen: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare updated_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare deleted_at: Date | null;
}