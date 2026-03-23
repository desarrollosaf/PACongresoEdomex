import { Model } from 'sequelize-typescript';
import { Comision } from './comisiones.entity';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
import { TipoCargoComision } from './tipo-cargo-comisiones.entity';
export declare class IntegranteComision extends Model {
    id: string;
    comision_id: string;
    comision: Comision;
    integrante_legislatura_id: string;
    tipo_cargo_comision_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    tipo_cargo: TipoCargoComision;
    integranteLegis: IntegranteLegislatura;
}
