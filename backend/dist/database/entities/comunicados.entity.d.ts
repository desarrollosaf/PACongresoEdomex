import { AutoresComunicados } from './autores-comunicados.entity';
import { DescripcionComunicados } from './descripcioncomunicados.entity';
import { Model } from 'sequelize-typescript';
import { Foto } from './foto.entity';
export declare class Comunicados extends Model {
    id: string;
    fecha: Date;
    comunicado: string;
    titulo: string;
    texto: string;
    fotos: Foto[];
    descripcion: DescripcionComunicados[];
    autores: AutoresComunicados[];
}
