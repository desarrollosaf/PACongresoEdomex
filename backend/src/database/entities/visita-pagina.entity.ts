import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'visitas_pagina',
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
})
export class VisitaPagina extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true
  })
  declare ruta: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    allowNull: false
  })
  declare contador: number;
}
