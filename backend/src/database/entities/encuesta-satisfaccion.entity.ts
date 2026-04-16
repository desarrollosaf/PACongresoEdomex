import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'encuestas_satisfaccion',
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
})
export class EncuestaSatisfaccion extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare ruta: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare calificacion: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  declare comentario: string;
}
