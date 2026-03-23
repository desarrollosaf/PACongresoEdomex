import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Comision } from './comisiones.entity';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
import { TipoCargoComision } from './tipo-cargo-comisiones.entity';

@Table({
  tableName: 'integrante_comisions',
  underscored: true,
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
})
export class IntegranteComision extends Model {
  @Column({
    type: DataType.CHAR(36),
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @ForeignKey(() => Comision)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false
  })
  comision_id: string;

  @BelongsTo(() => Comision)
  comision: Comision;

  @ForeignKey(() => IntegranteLegislatura)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false
  })
  integrante_legislatura_id: string;

  @BelongsTo(() => IntegranteLegislatura)
  integrante_legislatura: IntegranteLegislatura;

  @ForeignKey(() => TipoCargoComision)
  @Column({
    type: DataType.CHAR(36),
    allowNull: true
  })
  tipo_cargo_comision_id: string;

  @BelongsTo(() => TipoCargoComision)
  tipo_cargo: TipoCargoComision;

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
}
