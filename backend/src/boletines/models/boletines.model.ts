import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';

// import { AutorComunicado } from './autor-comunicado.entity';
// import { Foto } from './foto.entity';
// import { Legislatura } from './legislatura.entity';
// import { DescripcionComunicado } from './descripcion-comunicado.entity';

@Entity('comunicados')
export class Comunicado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  fecha: Date;

  @Column({ nullable: true })
  comunicado: number;

  @Column({ nullable: true })
  titulo: string;

  @Column({ nullable: true })
  texto: string;

  // 🗑 Soft delete (equivalente a SoftDeletes)
  @DeleteDateColumn()
  deletedAt: Date;
}