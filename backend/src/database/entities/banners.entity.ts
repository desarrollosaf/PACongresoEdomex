import { Column, Model, Table, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Foto } from './fotos.entity';

@Table({
  tableName: 'banners',
  underscored: true,
  timestamps: true, // porque manejas created_at manual
  paranoid: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
})
export class Banners extends Model {

  @Column({
    type: DataType.CHAR(36),
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare descripcion: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare url: string;

  @Column({
    type: DataType.NUMBER(),
    allowNull: true
  })
  declare orden: number;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare updated_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare deleted_at: Date;

  @HasMany(() => Foto, {
    foreignKey: 'fotoable_id',
    scope: {
      fotoable_type: 'App\\Models\\Banner', 
    }
  })
  fotos: Foto[];
}