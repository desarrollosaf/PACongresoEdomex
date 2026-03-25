import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Sede } from './sede.entity';

@Table({
  tableName: 'agendas',
  underscored: true,
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
export class Agenda extends Model {
  @Column({
    type: DataType.CHAR(36),
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare fecha_hora: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare fecha_hora_inicio: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare fecha_hora_fin: Date | null;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: false,
  })
  declare descripcion: string;

  @ForeignKey(() => Sede)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false,
  })
  declare sede_id: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare transmision: boolean;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  declare liga: string | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare estatus_transmision: boolean;

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

  @BelongsTo(() => Sede)
  declare sede: Sede;
}