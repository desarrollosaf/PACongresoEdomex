import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'sintesis_informativas',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export class SintesisInformativa extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({ type: DataType.DATEONLY })
  declare fecha: string;

  @Column({ type: DataType.STRING })
  declare sintesis_informativa: string;

  @Column({ type: DataType.STRING })
  declare portadas_nacionales: string;

  @Column({ type: DataType.STRING })
  declare portadas_estatales: string;

  @Column({ type: DataType.STRING })
  declare portadas_digitales: string;
}
