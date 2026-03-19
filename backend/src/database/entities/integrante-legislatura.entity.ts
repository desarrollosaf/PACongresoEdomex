import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Legislatura } from './legislatura.entity';
import { Diputado } from './diputado.entity';
import { Partido } from './partido.entity';
import { Distrito } from './distrito.entity';

@Table({ tableName: 'integrantes_legislatura', underscored: true, timestamps: true, paranoid: true })
export class IntegranteLegislatura extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => Legislatura)
  @Column({ type: DataType.INTEGER })
  legislatura_id: number;

  @BelongsTo(() => Legislatura)
  legislatura: Legislatura;

  @ForeignKey(() => Diputado)
  @Column({ type: DataType.INTEGER })
  diputado_id: number;

  @BelongsTo(() => Diputado)
  diputado: Diputado;

  @ForeignKey(() => Partido)
  @Column({ type: DataType.INTEGER })
  partido_id: number;

  @BelongsTo(() => Partido)
  partido: Partido;

  @ForeignKey(() => Distrito)
  @Column({ type: DataType.INTEGER })
  distrito_id: number;

  @BelongsTo(() => Distrito)
  distrito: Distrito;

  @Column({ type: DataType.DATEONLY })
  fecha_ingreso: Date;

  @Column({ type: DataType.DATEONLY })
  fecha_inicio: Date;

  @Column({ type: DataType.DATEONLY })
  fecha_fin: Date;
}
