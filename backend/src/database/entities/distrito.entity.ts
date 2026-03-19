import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';

@Table({ tableName: 'distritos', underscored: true, timestamps: true, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
export class Distrito extends Model {
  @Column({ type: DataType.CHAR(36), primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING })
  distrito: string;

  @Column({ type: DataType.INTEGER })
  municipio_id: number;

  @Column({ type: DataType.INTEGER })
  orden: number;

  @HasMany(() => IntegranteLegislatura)
  integrantes: IntegranteLegislatura[];
}
