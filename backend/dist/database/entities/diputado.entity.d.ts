import { Model } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
export declare class Diputado extends Model {
    id: string;
    apaterno: string;
    amaterno: string;
    nombres: string;
    descripcion: string;
    shortname: string;
    fancurl: string;
    gender_id: number;
    email: string;
    ext: string;
    facebook: string;
    twitter: string;
    instagram: string;
    unicacion: string;
    telefono: string;
    integrantes: IntegranteLegislatura[];
}
