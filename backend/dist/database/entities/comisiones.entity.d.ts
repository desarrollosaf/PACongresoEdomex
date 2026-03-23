import { Model } from 'sequelize-typescript';
import { TipoComision } from './tipo-comisiones.entity';
import { IntegranteComision } from './integrante-comisions.entity';
export declare class Comision extends Model {
    id: string;
    nombre: string;
    tipo_comision_id: string;
    alias: string;
    importancia: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    tipo: TipoComision;
    integrantes: IntegranteComision[];
}
