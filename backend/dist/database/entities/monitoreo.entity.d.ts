import { Model } from 'sequelize-typescript';
export declare class Monitoreo extends Model {
    id: number;
    fecha: Date | null;
    medio: string | null;
    titulo: string | null;
    texto: string | null;
    link: string | null;
    captura: Date | null;
}
