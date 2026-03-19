import { Model } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
export declare class Partido extends Model {
    id: number;
    siglas: string;
    nombre: string;
    emblema: string;
    rgb: string;
    rgb2: string;
    integrantes: IntegranteLegislatura[];
}
