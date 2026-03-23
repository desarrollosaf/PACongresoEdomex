import { Model } from 'sequelize-typescript';
<<<<<<< HEAD
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
=======
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
>>>>>>> a701671acd80628f1321415366b55871dfdff328
}
