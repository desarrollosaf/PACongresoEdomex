import { Model } from 'sequelize-typescript';
import { Legislatura } from './legislatura.entity';
import { Diputado } from './diputado.entity';
import { Partido } from './partido.entity';
import { Distrito } from './distrito.entity';
export declare class IntegranteLegislatura extends Model {
    id: number;
    legislatura_id: number;
    legislatura: Legislatura;
    diputado_id: number;
    diputado: Diputado;
    partido_id: number;
    partido: Partido;
    distrito_id: number;
    distrito: Distrito;
    fecha_ingreso: Date;
    fecha_inicio: Date;
    fecha_fin: Date;
}
