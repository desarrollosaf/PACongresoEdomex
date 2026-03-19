import { Model } from 'sequelize-typescript';
import { Legislatura } from './legislatura.entity';
import { Diputado } from './diputado.entity';
import { Partido } from './partido.entity';
import { Distrito } from './distrito.entity';
export declare class IntegranteLegislatura extends Model {
    id: string;
    legislatura_id: string;
    legislatura: Legislatura;
    diputado_id: string;
    diputado: Diputado;
    partido_id: string;
    partido: Partido;
    distrito_id: string;
    distrito: Distrito;
    fecha_ingreso: Date;
    fecha_inicio: Date;
    fecha_fin: Date;
}
