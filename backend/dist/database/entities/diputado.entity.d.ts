import { Model } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
import { Foto } from './fotos.entity';
import { AutoresComunicados } from './autores-comunicados.entity';
import { Gender } from './gender.entity';
export declare class Diputado extends Model {
    id: string;
    apaterno: string;
    amaterno: string;
    nombres: string;
    descripcion: string;
    shortname: string;
    fancyurl: string;
    gender_id: string;
    genero: Gender;
    email: string;
    ext: string;
    facebook: string;
    twitter: string;
    instagram: string;
    ubicacion: string;
    telefono: string;
    integrantes: IntegranteLegislatura[];
    fotos: Foto[];
    autores_comunicados: AutoresComunicados[];
}
