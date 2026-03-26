import { Model } from 'sequelize-typescript';
import { Foto } from './fotos.entity';
export declare class Banners extends Model {
    id: string;
    descripcion: string;
    url: string;
    orden: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    fotos: Foto[];
}
