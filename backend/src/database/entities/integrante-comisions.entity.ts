import { Column, Model, Table, ForeignKey, BelongsTo, DataType, HasMany } from 'sequelize-typescript';
import { Comision } from './comisiones.entity';
import { IntegranteLegislatura } from './integrante-legislatura.entity';
import { TipoCargoComision } from './tipo-cargo-comision.entity';


@Table({ tableName: 'integrante_comisions', underscored: true, timestamps: true, paranoid: true, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
export class IntegranteComision extends Model {
    @Column({ type: DataType.CHAR(36), primaryKey: true, defaultValue: DataType.UUIDV4 })
    declare id: string;

    @ForeignKey(() => Comision)
    @Column({ type: DataType.CHAR(36) })
    comision_id: string;

    @ForeignKey(() => IntegranteLegislatura)
    @Column({ type: DataType.CHAR(36) })
    integrante_legislatura_id: string;

    @ForeignKey(() => TipoCargoComision)
    @Column({ type: DataType.CHAR(36) })
    tipo_cargo_comision_id: string;

    @Column({
    type: DataType.DATE,
    allowNull: true
    })
    declare created_at: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare updated_at: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare deleted_at: Date;


    @BelongsTo(() => TipoCargoComision)
    cargo: TipoCargoComision;

    @BelongsTo(() => IntegranteLegislatura)
    integranteLegis: IntegranteLegislatura;
}  
