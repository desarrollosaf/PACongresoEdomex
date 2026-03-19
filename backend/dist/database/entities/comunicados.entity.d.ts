import { Model } from 'sequelize-typescript';
export declare class Comunicados extends Model {
    id: string;
    fecha: Date;
    comunicado: string;
    titulo: string;
    texto: string;
}
