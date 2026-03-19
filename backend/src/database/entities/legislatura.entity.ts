import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';

@Table({ tableName: 'legislaturas', underscored: true, timestamps: true, paranoid: true, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
export class Legislatura extends Model {
  @Column({ type: DataType.CHAR(36), primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING })
  numero: string;

  @Column({ type: DataType.DATEONLY })
  fecha_inicio: Date;

  @Column({ type: DataType.DATEONLY })
  fecha_fin: Date;

  @HasMany(() => IntegranteLegislatura)
  integrantes: IntegranteLegislatura[];
}
