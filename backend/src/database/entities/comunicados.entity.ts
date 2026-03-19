import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Foto } from './fotos.entity';
import { DescripcionComunicados } from './descripcioncomunicados.entity';
import { Order } from 'sequelize';

@Table({ tableName: 'comunicados', underscored: true, timestamps: true, paranoid: true })
export class Comunicados extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.DATE })
  declare fecha: Date;

  @Column({ type: DataType.STRING })
  declare comunicado: string;

  @Column({ type: DataType.STRING })
  declare titulo: string;

  @Column({ type: DataType.TEXT })
  declare texto: string;

  @HasMany(() => Foto, {
    foreignKey: 'fotoable_id',
    scope: {
      fotoable_type: 'App\\Models\\Comunicado', 
    }
  })
  fotos: Foto[];

  @HasMany(() => DescripcionComunicados, {
    foreignKey: 'comunicado_id',
  })
  descripcion: DescripcionComunicados[];
}
