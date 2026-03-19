import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';

@Table({ tableName: 'legislaturas', underscored: true, timestamps: true, paranoid: true })
export class Legislatura extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  numero: string;

  @Column({ type: DataType.DATEONLY })
  fecha_inicio: Date;

  @Column({ type: DataType.DATEONLY })
  fecha_fin: Date;

  @HasMany(() => IntegranteLegislatura)
  integrantes: IntegranteLegislatura[];
}
