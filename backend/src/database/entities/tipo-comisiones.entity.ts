import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Comision } from './comisiones.entity';

@Table({
  tableName: 'tipo_comisions',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
})
export class TipoComision extends Model {

  @Column({
    type: DataType.CHAR(36),
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare valor: string;

  @Column(DataType.DATE)
  declare created_at: Date;

  @Column(DataType.DATE)
  declare updated_at: Date;

  // 🔗 Relación inversa
  @HasMany(() => Comision)
  declare comisiones: Comision[];
}