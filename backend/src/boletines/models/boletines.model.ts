import {
 Column, Model, Table, HasMany, 
 PrimaryKey,
 DataType,
 Default
} from 'sequelize-typescript';

// import { AutorComunicado } from './autor-comunicado.entity';
// import { Foto } from './foto.entity';
// import { Legislatura } from './legislatura.entity';
// import { DescripcionComunicado } from './descripcion-comunicado.entity';

@Table({
  tableName: 'comunicados'
})
export class Comunicado extends Model {
 @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  fecha: Date;

  @Column
  comunicado: number;

  @Column
  titulo: string;

  @Column
  texto: string;
}