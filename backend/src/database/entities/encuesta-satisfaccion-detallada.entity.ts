import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'encuestas_satisfaccion_detallada',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
})
export class EncuestaSatisfaccionDetallada extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  declare ruta: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare experiencia_general: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare facilidad_navegacion: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare claridad_informacion: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare diseno_presentacion: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare utilidad_contenido: number;

}
