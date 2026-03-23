import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { IntegranteComision } from './integrante-comisions.entity';

@Table({
  tableName: 'tipo_cargo_comisions',
  underscored: true,
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
})
export class TipoCargoComision extends Model {
  @Column({
    type: DataType.CHAR(36),
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare valor: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  declare nivel: number;

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

  @HasMany(() => IntegranteComision)
  integrantes: IntegranteComision[];
}
