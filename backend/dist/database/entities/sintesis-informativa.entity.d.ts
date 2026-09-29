import { Model } from 'sequelize-typescript';
export declare class SintesisInformativa extends Model {
    id: number;
    fecha: string;
    sintesis_informativa: string;
    portadas_nacionales: string;
    portadas_estatales: string;
    portadas_digitales: string;
}
