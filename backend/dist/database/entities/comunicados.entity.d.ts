import { Model } from 'sequelize-typescript';
import { Foto } from './fotos.entity';
import { DescripcionComunicados } from './descripcioncomunicados.entity';
export declare class Comunicados extends Model {
    id: string;
    fecha: Date;
    comunicado: string;
    titulo: string;
    texto: string;
    fotos: Foto[];
    descripcion: DescripcionComunicados[];
}
