import { Model } from 'sequelize-typescript';
export declare class EncuestaSatisfaccion extends Model {
    id: string;
    ruta: string;
    calificacion: number;
    comentario: string;
}
