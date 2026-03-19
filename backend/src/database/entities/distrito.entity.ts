import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';

@Table({ tableName: 'distritos', underscored: true, timestamps: true })
export class Distrito extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  distrito: string;

  @Column({ type: DataType.INTEGER })
  municipio_id: number;

  @Column({ type: DataType.INTEGER })
  orden: number;

  @HasMany(() => IntegranteLegislatura)
  integrantes: IntegranteLegislatura[];
}
