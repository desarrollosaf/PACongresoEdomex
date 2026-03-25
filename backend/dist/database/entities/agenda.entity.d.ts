import { Model } from 'sequelize-typescript';
import { Sede } from './sede.entity';
export declare class Agenda extends Model {
    id: string;
    fecha_hora: Date;
    fecha_hora_inicio: Date | null;
    fecha_hora_fin: Date | null;
    descripcion: string;
    sede_id: string;
    transmision: boolean;
    liga: string | null;
    estatus_transmision: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    sede: Sede;
}
