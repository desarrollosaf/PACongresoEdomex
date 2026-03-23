import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Comunicados } from './comunicados.entity';
import { IntegranteLegislatura } from './integrante-legislatura.entity';

@Table({
  tableName: 'autores_comunicados',
  underscored: true,
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
})
export class AutoresComunicados extends Model {
  @Column({
    type: DataType.CHAR(36),
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @ForeignKey(() => Comunicados)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false
  })
  comunicado_id: string;

  @BelongsTo(() => Comunicados, { foreignKey: 'comunicado_id', targetKey: 'id' })
  comunicado: Comunicados;

  @Column({
    type: DataType.CHAR(36),
    allowNull: true
  })
  tipo_autor_id: string;

  @ForeignKey(() => IntegranteLegislatura)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false
  })
  autor_id: string;

  @BelongsTo(() => IntegranteLegislatura, { foreignKey: 'autor_id', targetKey: 'id', constraints: false })
  autor: IntegranteLegislatura;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare created_at: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: true })
  declare updated_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare deleted_at: Date;
}
