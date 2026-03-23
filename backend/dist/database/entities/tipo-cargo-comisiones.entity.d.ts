import { Model } from 'sequelize-typescript';
import { IntegranteComision } from './integrante-comisions.entity';
export declare class TipoCargoComision extends Model {
    id: string;
    valor: string;
    nivel: number;
    created_at: Date;
    updated_at: Date;
    integrantes: IntegranteComision[];
}
