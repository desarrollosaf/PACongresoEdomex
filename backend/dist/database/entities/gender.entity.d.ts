import { Model } from 'sequelize-typescript';
import { Diputado } from './diputado.entity';
export declare class Gender extends Model {
    id: string;
    genero: string;
    diputados: Diputado[];
}
