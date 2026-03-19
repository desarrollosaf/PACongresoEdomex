import { Model } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
export declare class Distrito extends Model {
    id: string;
    distrito: string;
    municipio_id: number;
    orden: number;
    integrantes: IntegranteLegislatura[];
}
