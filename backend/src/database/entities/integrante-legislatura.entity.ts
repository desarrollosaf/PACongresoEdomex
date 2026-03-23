import { Column, Model, Table, ForeignKey, BelongsTo, DataType, HasMany } from 'sequelize-typescript';
import { Legislatura } from './legislatura.entity';
import { Diputado } from './diputado.entity';
import { Partido } from './partido.entity';
import { Distrito } from './distrito.entity';
import { IntegranteComision } from './integrante-comisions.entity';
import { AutoresComunicados } from './autores-comunicados.entity';

@Table({ tableName: 'integrante_legislaturas', underscored: true, timestamps: true, paranoid: true, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
export class IntegranteLegislatura extends Model {
  @Column({ type: DataType.CHAR(36), primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @ForeignKey(() => Legislatura)
  @Column({ type: DataType.CHAR(36) })
  legislatura_id: string;

  @BelongsTo(() => Legislatura)
  legislatura: Legislatura;

  @ForeignKey(() => Diputado)
  @Column({ type: DataType.CHAR(36) })
  diputado_id: string;

  @BelongsTo(() => Diputado)
  diputado: Diputado;

  @ForeignKey(() => Partido)
  @Column({ type: DataType.CHAR(36) })
  partido_id: string;

  @BelongsTo(() => Partido)
  partido: Partido;

  @ForeignKey(() => Distrito)
  @Column({ type: DataType.CHAR(36) })
  distrito_id: string;

  @BelongsTo(() => Distrito)
  distrito: Distrito;

  @Column({ type: DataType.DATEONLY })
  fecha_ingreso: Date;

  @Column({ type: DataType.DATEONLY })
  fecha_inicio: Date;

  @Column({ type: DataType.DATEONLY })
  fecha_fin: Date;

  @HasMany(() => IntegranteComision, { foreignKey: 'integrante_legislatura_id' })
  comisiones: IntegranteComision[];

  @HasMany(() => AutoresComunicados, { foreignKey: 'autor_id' })
  autores_comunicados: AutoresComunicados[];
}
