import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { BelongsTo, ForeignKey } from 'sequelize-typescript';
import { TipoComision } from './tipo-comisiones.entity';

@Table({
  tableName: 'comisions',
  underscored: true,
  timestamps: false, // porque manejas created_at manual
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
})
export class Comision extends Model {

  @Column({
    type: DataType.CHAR(36),
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare nombre: string;
  
  @ForeignKey(() => TipoComision)
  @Column({
    type: DataType.CHAR(30),
    allowNull: false
  })
  declare tipo_comision_id: string;
  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare alias: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  declare importancia: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare updated_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare deleted_at: Date;


  @BelongsTo(() => TipoComision)
  declare tipo: TipoComision;

}