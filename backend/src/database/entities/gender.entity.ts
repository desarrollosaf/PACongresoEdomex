import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Diputado } from './diputado.entity';

@Table({ tableName: 'genders', underscored: true, timestamps: true, paranoid: false, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
export class Gender extends Model {
  @Column({ type: DataType.CHAR(36), primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING })
  genero: string;

  @HasMany(() => Diputado, { foreignKey: 'gender_id' })
  diputados: Diputado[];
}
