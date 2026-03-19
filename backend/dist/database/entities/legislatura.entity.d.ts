import { Model } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
export declare class Legislatura extends Model {
    id: number;
    numero: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    integrantes: IntegranteLegislatura[];
}
