import { Model } from 'sequelize-typescript';
export declare class Gaceta extends Model {
    id: number;
    date: string;
    year: number;
    numero: number;
    tomo: number;
    documento: string;
    size: number;
    format: string;
}
