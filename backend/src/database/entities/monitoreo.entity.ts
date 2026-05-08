import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'cdd_monitoreo_csv',
  underscored: false,
  timestamps: false,
})
export class Monitoreo extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare fecha: Date | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare medio: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare titulo: string | null;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  declare texto: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare link: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare captura: Date | null;
}
