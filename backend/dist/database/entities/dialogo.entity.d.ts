import { Model } from 'sequelize-typescript';
export declare class Dialogo extends Model {
    id: number;
    titulo: string;
    fecha: Date | null;
    texto: string;
    liga: string;
    imagen: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
