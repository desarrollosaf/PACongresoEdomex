import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
import { Foto } from './foto.entity';
import { AutoresComunicados } from './autores-comunicados.entity';

@Table({ tableName: 'diputados', underscored: true, timestamps: true, paranoid: true, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
export class Diputado extends Model {
  @Column({ type: DataType.CHAR(36), primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

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
  fancyurl: string; 

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
  ubicacion: string;

  @Column({ type: DataType.STRING })
  telefono: string;

  @HasMany(() => IntegranteLegislatura)
  integrantes: IntegranteLegislatura[];

  @HasMany(() => Foto, { foreignKey: 'fotoable_id', constraints: false })
  fotos: Foto[];

  @HasMany(() => AutoresComunicados, { foreignKey: 'autor_id', constraints: false })
  autores_comunicados: AutoresComunicados[];
}
