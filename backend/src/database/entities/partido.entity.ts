import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';

@Table({ tableName: 'partidos', underscored: true, timestamps: true, paranoid: true })
export class Partido extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  siglas: string;

  @Column({ type: DataType.STRING })
  nombre: string;

  @Column({ type: DataType.TEXT })
  emblema: string;

  @Column({ type: DataType.STRING })
  rgb: string;

  @Column({ type: DataType.STRING })
  rgb2: string;

  @HasMany(() => IntegranteLegislatura)
  integrantes: IntegranteLegislatura[];
}
