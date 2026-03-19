import { Model } from 'sequelize-typescript';
export declare class DescripcionComunicados extends Model {
    id: string;
    bullets: string;
    comunicado_id: string;
    orden: number;
}
