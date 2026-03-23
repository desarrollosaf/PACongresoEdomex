import { Model } from 'sequelize-typescript';
import { Comision } from './comisiones.entity';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
import { TipoCargoComision } from './tipo-cargo-comisiones.entity';
export declare class IntegranteComision extends Model {
    id: string;
    comision_id: string;
    comision: Comision;
    integrante_legislatura_id: string;
    integrante_legislatura: IntegranteLegislatura;
    tipo_cargo_comision_id: string;
    tipo_cargo: TipoCargoComision;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
