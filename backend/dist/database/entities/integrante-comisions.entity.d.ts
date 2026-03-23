import { Model } from 'sequelize-typescript';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
import { TipoCargoComision } from './tipo-cargo-comision.entity';
export declare class IntegranteComision extends Model {
    id: string;
    comision_id: string;
    integrante_legislatura_id: string;
    tipo_cargo_comision_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    cargo: TipoCargoComision;
    integranteLegis: IntegranteLegislatura;
}
