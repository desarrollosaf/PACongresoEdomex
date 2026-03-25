import {
  Column,
  Model,
  Table,
  DataType, 
  HasMany
} from 'sequelize-typescript';
import { Agenda } from './agenda.entity';

@Table({
  tableName: 'sedes',
  underscored: true,
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
export class Sede extends Model {
  @Column({
    type: DataType.CHAR(36),
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  declare sede: string | null;

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

  @HasMany(() => Agenda)
  declare agendas: Agenda[];

}   