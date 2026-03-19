import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';

@Table({ tableName: 'descripcione_comunicados', underscored: true, timestamps: true, paranoid: true })
export class DescripcionComunicados extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare bullets: string;

  @Column({ type: DataType.STRING })
  declare comunicado_id: string;

  @Column({ type: DataType.NUMBER })
  declare orden: number;


}