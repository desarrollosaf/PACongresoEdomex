import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';

@Table({ tableName: 'comunicados', underscored: true, timestamps: true, paranoid: true })
export class Comunicados extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.DATE })
  fecha: Date;

  @Column({ type: DataType.STRING })
  comunicado: string;

  @Column({ type: DataType.STRING })
  titulo: string;

  @Column({ type: DataType.TEXT })
  texto: string;

//   @HasMany(() => IntegranteLegislatura)
//   integrantes: IntegranteLegislatura[];
}
