import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';

@Table({ tableName: 'diputados', underscored: true, timestamps: true, paranoid: true })
export class Diputado extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  apaterno: string;

  @Column({ type: DataType.STRING })
  amaterno: string;

  @Column({ type: DataType.STRING })
  nombres: string;

  @Column({ type: DataType.TEXT })
  descripcion: string;

  @Column({ type: DataType.STRING })
  shortname: string;

  @Column({ type: DataType.STRING })
  fancurl: string;

  @Column({ type: DataType.INTEGER })
  gender_id: number;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  ext: string;

  @Column({ type: DataType.STRING })
  facebook: string;

  @Column({ type: DataType.STRING })
  twitter: string;

  @Column({ type: DataType.STRING })
  instagram: string;

  @Column({ type: DataType.STRING })
  unicacion: string; // From the requirements

  @Column({ type: DataType.STRING })
  telefono: string;

  @HasMany(() => IntegranteLegislatura)
  integrantes: IntegranteLegislatura[];
}
