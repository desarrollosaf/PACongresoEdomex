import { Model } from 'sequelize-typescript';
import { Comision } from './comisiones.entity';
export declare class TipoComision extends Model {
    id: string;
    valor: string;
    created_at: Date;
    updated_at: Date;
    comisiones: Comision[];
}
