import { Model } from 'sequelize-typescript';
import { Comunicados } from './comunicados.entity';
import { Diputado } from './diputado.entity';
export declare class AutoresComunicados extends Model {
    id: string;
    comunicado_id: string;
    comunicado: Comunicados;
    tipo_autor_id: string;
    autor_id: string;
    autor: Diputado;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
