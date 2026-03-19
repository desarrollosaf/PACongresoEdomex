import { Model } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
import { Foto } from './foto.entity';
export declare class Diputado extends Model {
    id: string;
    apaterno: string;
    amaterno: string;
    nombres: string;
    descripcion: string;
    shortname: string;
    fancyurl: string;
    gender_id: number;
    email: string;
    ext: string;
    facebook: string;
    twitter: string;
    instagram: string;
    ubicacion: string;
    telefono: string;
    integrantes: IntegranteLegislatura[];
    fotos: Foto[];
}
