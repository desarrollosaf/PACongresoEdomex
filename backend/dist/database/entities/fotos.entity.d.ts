import { Model } from 'sequelize-typescript';
export declare class Foto extends Model {
    id: string;
    path: string;
    fotoable_id: string;
    fotoable_type: string;
}
