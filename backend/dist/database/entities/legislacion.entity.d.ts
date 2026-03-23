import { Model } from 'sequelize-typescript';
export declare class Legislacion extends Model {
    id: number;
    nombre: string;
    path: string;
    createdAt: Date;
    updatedAt: Date;
}
